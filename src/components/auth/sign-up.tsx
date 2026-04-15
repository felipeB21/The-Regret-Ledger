"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

type Inputs = {
  email: string;
  name: string;
  password: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setServerError(null);

    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setServerError(ctx.error.message);
        },
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FieldSet>
          <FieldLegend>Únete al Registro</FieldLegend>
          <FieldDescription>
            Crea una cuenta para guardar tus cartas, configurar alertas y buscar
            respuestas en el anonimato.
          </FieldDescription>

          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="felipe@ejemplo.com"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Felipe"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </Field>
          </FieldGroup>

          {serverError && (
            <div className="text-red-500 text-sm mb-2 font-medium">
              {serverError}
            </div>
          )}

          <Field className="mt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </Field>
        </FieldSet>
      </form>
    </div>
  );
}
