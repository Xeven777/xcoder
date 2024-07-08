import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xcoder - AI Code Convertor",
  description: "Convert your code to more than 35 languages with AI in a go!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " overflow-x-hidden"}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ThemeTogglebutton className="absolute top-2 right-6 z-[100]" />
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
