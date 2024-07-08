"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";
import { Oxygen_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Convertor from "./Convertor";
const font = Oxygen_Mono({ subsets: ["latin"], weight: ["400"] });
const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="relative flex min-h-svh w-full flex-col items-center pt-20 md:pt-32 overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-zinc-400/80 bg-clip-text text-center text-6xl max-w-xl font-semibold leading-none text-transparent dark:from-white dark:to-zinc-600/80 tracking-tight">
        Transform{" "}
        <span className={cn(font.className, "text-7xl text-primary/80")}>
          {"{"}Code{"}"}
        </span>{" "}
        Effortlessly with AI
      </h1>
      <p className="md:text-lg pt-5 text-muted-foreground max-w-prose">
        Paste your code and convert them in a go!
      </p>
      <Particles
        className="absolute inset-0"
        quantity={400}
        ease={80}
        color={color}
        refresh
      />
      <Convertor />
    </div>
  );
};

export default ParticlesDemo;
