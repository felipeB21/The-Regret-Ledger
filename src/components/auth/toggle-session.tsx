import { getSession } from "@/lib/auth-server";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default async function ToggleSession() {
  const session = await getSession();
  if (session == null || !session.user)
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <Button variant="secondary" className={"p-4"}>
            Sign in
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className={"bg-accent-foreground p-4"}>Sign Up</Button>
        </Link>
      </div>
    );
  return (
    <Link href={"/profile"} className="flex flex-col items-center">
      <Image src={"/user.svg"} alt={session.user.name} width={14} height={14} />
      <span className="text-xs">{session.user.name}</span>
    </Link>
  );
}
