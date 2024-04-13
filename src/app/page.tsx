"use client";

import { Hero } from "@/components/home/Hero";
import { TopNavBar } from "@/components/home/TopNavBar";

import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Features } from "@/components/home/Features";
import { Waitlist } from "@/components/home/Waitlist";

const HomePage = () => {
  return (
    <>
      {/* Your code here */}
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative mb-20">
          <main className="flex flex-col items-center justify-between">
            <TopNavBar />
            <Hero />
            <Features />
            <Waitlist />
          </main>
        </div>
      </TracingBeam>
    </>
  );
};

export default HomePage;
