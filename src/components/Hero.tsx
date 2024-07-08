// const Hero = () => {
//   return (
//     <div className=" min-h-screen flex flex-col items-center justify-center">
//       <div className="text-center space-y-6">
//         <h1 className="text-5xl md:text-7xl font-bold">
//           Magic UI is the new way to build landing pages.
//         </h1>
//         <p className="text-lg md:text-2xl">
//           Beautifully designed, animated components and templates built with
//           Tailwind CSS, React, and Framer Motion.
//         </p>
//         <button className="mt-6 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200">
//           Get Started for free
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Hero;

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";

const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl text-center">
      <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Particles
      </h1>
      <p className="md:text-lg  text-muted-foreground max-w-prose">
        Beautifully designed, animated components and templates built with
        Tailwind CSS, React, and Framer Motion.
      </p>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default ParticlesDemo;
