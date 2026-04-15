import type { Metadata } from "next";
import NewLetterForm from "@/components/letter/new-letter";

export const metadata: Metadata = {
  title: "New Letter | The Regret Ledger",
  description: "...",
};

export default function NewLetterPage() {
  return <NewLetterForm />;
}
