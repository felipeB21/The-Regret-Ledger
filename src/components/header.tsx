import Link from "next/link";
import ToggleSession from "./auth/toggle-session";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="z-50 bg-background">
      <div className="max-w-3xl mx-auto p-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-playwrite-ie">
            The Regret Ledger
          </Link>
          <Navbar />
          <ToggleSession />
        </div>
      </div>
    </header>
  );
}
