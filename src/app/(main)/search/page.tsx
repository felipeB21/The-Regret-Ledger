import type { Metadata } from "next";
import Search from "@/components/search";

export const metadata: Metadata = {
  title: "Search | The Regret Ledger",
  description: "...",
};

export default function SearchPage() {
  return <Search />;
}
