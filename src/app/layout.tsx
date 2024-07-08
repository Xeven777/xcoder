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
  metadataBase: new URL("https://xcoder7.vercel.app"),
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
          <nav className="sticky top-0 backdrop-blur-md border-b bg-background/20 rounded-b-xl z-50 flex items-center justify-between py-2 w-full px-6 md:px-10 shadow-md">
            <h1 className="text-lg font-semibold md:text-2xl cursor-crosshair">
              <span className="text-primary">X</span>coder.{" "}
              <span className="text-primary">_</span>
            </h1>
            <ThemeTogglebutton />
          </nav>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
