import HeroAuth from "@/components/auth/hero-auth";
import SignInForm from "@/components/auth/sign-in";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }
  return (
    <HeroAuth>
      <SignInForm />
    </HeroAuth>
  );
}
