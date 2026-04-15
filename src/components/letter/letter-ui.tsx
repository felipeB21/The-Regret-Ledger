"use client";
import { Letter } from "@/types/letter";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";

export function LetterUI({ letter }: { letter: Letter[] }) {
  const [globalFont, setGlobalFont] = useState("font-playwrite-ie");

  return (
    <section className="mt-10 max-w-2xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
          onClick={() =>
            setGlobalFont((f) =>
              f === "font-playwrite-ie" ? "font-sans" : "font-playwrite-ie",
            )
          }
        >
          Toggle Reading Mode:{" "}
          {globalFont === "font-sans" ? "Manuscript" : "Classic"}
        </button>
      </div>

      <ul className="space-y-12">
        {letter?.map((lt) => (
          <li
            key={lt.id}
            className="group flex flex-col gap-3 border-l-2 border-stone-200 pl-6 pb-2"
          >
            <div className="flex items-center justify-between text-xs font-medium text-stone-500 uppercase tracking-tighter">
              <div className="flex items-center gap-4">
                <h5 className="text-stone-900 font-bold">
                  To: {lt.targetName || "Someone"}
                </h5>
                <div className="flex items-center gap-1">
                  <Image
                    src="/map.svg"
                    alt="Location"
                    width={12}
                    height={12}
                    className="opacity-60"
                  />
                  <span>{lt.targetCity || "Unknown location"}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 italic">
                <span>{format(new Date(lt.createdAt), "MMM do, yyyy")}</span>
              </div>
            </div>

            <p
              className={`${globalFont} text-base leading-relaxed text-stone-800 antialiased`}
            >
              {lt.content}
            </p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-stone-400">
                {lt.isAnonymous
                  ? "— Posted Anonymously"
                  : `— Written by ${lt.authorId ? "User" : "Guest"}`}
              </span>

              <span className="text-[10px] text-stone-300">
                {lt.viewsCount} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
