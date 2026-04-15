"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/new-letter",
    label: "Create letter",
    icon: "/new-letter.svg",
    iconFilled: "/new-letter-fill.svg",
  },
  {
    href: "/search",
    label: "Search",
    icon: "/search.svg",
    iconFilled: "/search-fill.svg",
  },
  {
    href: "/messages",
    label: "Messages",
    icon: "/inbox.svg",
    iconFilled: "/inbox-fill.svg",
  },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-7">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex flex-col items-center">
              <Image
                src={pathname === item.href ? item.iconFilled : item.icon}
                alt={item.label}
                width={14}
                height={14}
              />
              <span
                className={`${pathname === item.href ? "font-bold" : ""} text-xs`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
