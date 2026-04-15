import type { Metadata } from "next";
import Messages from "@/components/messages";

export const metadata: Metadata = {
  title: "Messages | The Regret Ledger",
  description: "...",
};

export default function MessagesPage() {
  return <Messages />;
}
