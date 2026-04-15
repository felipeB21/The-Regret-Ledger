import HeroAuth from "@/components/auth/hero-auth";
import SignUpForm from "@/components/auth/sign-up";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <HeroAuth>
        <SignUpForm />
      </HeroAuth>
    </div>
  );
}
