"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function Waitlist() {
  const words = [
    {
      text: "Join",
    },
    {
      text: "the",
    },
    {
      text: "Waitlist",
    },
    {
      text: "Application.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Ease your mind on the Road
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/signup">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Join now
          </button>
        </Link>
        <Link href="/login">
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
