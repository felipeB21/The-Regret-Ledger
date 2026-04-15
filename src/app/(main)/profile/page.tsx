import type { Metadata } from "next";
import { getSession } from "@/lib/auth-server";
import { getUserLetters } from "@/actions/letters";
import { LetterUI } from "@/components/letter/letter-ui";

export const metadata: Metadata = {
  title: "Profile | The Regret Ledger",
  description: "...",
};

export default async function ProfilePage() {
  const session = await getSession();
  const data = await getUserLetters(session?.user?.id ?? "", 5, 0);

  if (!data.success) {
    return <div>Error: {data.error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-3 items-center justify-center">
        <h1 className="font-semibold text-6xl">{session?.user?.name}</h1>
        <p className="text-xs text-stone-700">
          You have <span className="font-bold">{data.letters.length}</span>{" "}
          regrets.
        </p>
      </div>

      <LetterUI letter={data.letters} />
    </div>
  );
}
