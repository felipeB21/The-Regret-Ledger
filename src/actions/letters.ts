"use server";

import { db } from "@/db";
import { letter } from "@/db/schema";
import { getSession } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const letterSchema = z.object({
  content: z
    .string()
    .min(10, "El arrepentimiento debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo"),
  targetName: z.string().min(1, "Necesitamos un nombre o alias").max(100),
  targetCity: z.string().min(1, "La ciudad es obligatoria").max(100),
});

export async function createLetterAction(formData: FormData) {
  const session = await getSession();

  const rawData = {
    content: formData.get("content"),
    targetName: formData.get("targetName"),
    targetCity: formData.get("targetCity"),
  };

  const validatedFields = letterSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: "Datos inválidos",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { content, targetName, targetCity } = validatedFields.data;

  try {
    await db.insert(letter).values({
      id: randomUUID(),
      content,
      targetName,
      targetCity,
      authorId: session?.user?.id ?? null,
      isAnonymous: !session,
    });

    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error("Error al insertar carta:", e);
    return { error: "Error de base de datos. Inténtalo de nuevo." };
  }
}

export async function getAllLetters() {
  try {
    const letters = await db.select().from(letter);
    return { success: true, letters };
  } catch (e) {
    console.error("Error al obtener cartas:", e);
    return { error: "Error de base de datos. Inténtalo de nuevo." };
  }
}

export async function getUserLetters(
  userId: string,
  max: number = 10,
  offset: number = 0,
) {
  if (!userId) {
    return {
      success: false as const,
      error: "User ID requerido",
    };
  }

  const safeLimit = Math.min(max, 50);

  try {
    const letters = await db.query.letter.findMany({
      where: (l, { eq }) => eq(l.authorId, userId),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: (l, { desc }) => [desc(l.createdAt)],
      limit: safeLimit,
      offset,
    });

    return {
      success: true as const,
      letters,
    };
  } catch (e) {
    console.error("Error al obtener cartas del usuario:", e);

    return {
      success: false as const,
      error: "Error de base de datos. Inténtalo de nuevo.",
    };
  }
}
