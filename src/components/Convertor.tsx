"use client";

import { useState } from "react";
import CodeEditor from "@/components/Codeeditor";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { z } from "zod";
import { experimental_useObject as useObject } from "ai/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Atom, Code2Icon, Copy } from "lucide-react";
import { DM_Mono } from "next/font/google";
import ShineBorder from "./magicui/shine-border";
import { useTheme } from "next-themes";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const font = DM_Mono({ subsets: ["latin"], weight: ["400"] });

const Convertor = () => {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/codegen",
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });

  const theme = useTheme();
  const [sourceCode, setSourceCode] = useState("// Write your code here");
  const [translatedCode, setTranslatedCode] = useState<string>("");
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [translatedLanguage, setTranslatedLanguage] = useState("javascript");

  const prompted = `convert this code from ${sourceLanguage} to ${translatedLanguage} : \n ${sourceCode}`;

  if (error) {
    toast.error("Failed to generate code");
  }

  function copy(text: string) {
    console.log(text);
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="max-w-screen min-h-screen w-full md:px-14 my-10">
      <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 relative">
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setSourceLanguage} defaultValue="javascript">
              <SelectTrigger className="rounded-e-none border-e-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="ada">Ada</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="cobol">COBOL</SelectItem>
                <SelectItem value="coffeescript">CoffeeScript</SelectItem>
                <SelectItem value="delphi">Delphi</SelectItem>
                <SelectItem value="erlang">Erlang</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="fortran">Fortran</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="groovy">Groovy</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="lisp">Lisp</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="matlab">MATLAB</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="pascal">Pascal</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="tcl">Tcl</SelectItem>
                <SelectItem value="vbnet">VB.NET</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"outline"}
              className="rounded-s-none"
              size={"icon"}
              onClick={() => copy(sourceCode)}
            >
              <Copy />
            </Button>
          </div>
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-0.5 bg-background shadow-md hover:shadow-xl transm dark:shadow-none"
            color={theme.theme === "dark" ? "white" : "black"}
          >
            <div className="rounded-b-xl overflow-hidden w-full">
              <CodeEditor
                language={sourceLanguage}
                value={sourceCode}
                onChange={(value: any) => setSourceCode(value)}
              />
            </div>
          </ShineBorder>
        </div>
        <Button
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          onClick={() => {
            submit(prompted);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Atom className="animate-spin" />
            </>
          ) : (
            <>
              Convert <Code2Icon className="ml-2" />
            </>
          )}
        </Button>
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setTranslatedLanguage} defaultValue="cpp">
              <SelectTrigger className="rounded-e-none border-e-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="ada">Ada</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="cobol">COBOL</SelectItem>
                <SelectItem value="coffeescript">CoffeeScript</SelectItem>
                <SelectItem value="delphi">Delphi</SelectItem>
                <SelectItem value="erlang">Erlang</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="fortran">Fortran</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="groovy">Groovy</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="lisp">Lisp</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="matlab">MATLAB</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="pascal">Pascal</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="tcl">Tcl</SelectItem>
                <SelectItem value="vbnet">VB.NET</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"outline"}
              className="rounded-s-none"
              size={"icon"}
              onClick={() => copy(object?.code || translatedCode)}
            >
              <Copy />
            </Button>
          </div>
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-0.5 bg-background shadow-md hover:shadow-xl transm dark:shadow-none"
            color={theme.theme === "dark" ? ["white", "#bef7d1"] : "black"}
          >
            <div className="rounded-b-xl w-full overflow-hidden">
              <CodeEditor
                language={translatedLanguage}
                value={object?.code || ""}
                onChange={(value: any) => setTranslatedCode(value)}
              />
            </div>
          </ShineBorder>
        </div>
      </div>
      {object?.explanation && (
        <div className="mt-4 p-2 md:p-10 mx-auto border-2 border-dashed rounded-lg border-s-primary">
          <h1 className="text-2xl py-2 md:text-4xl font-semibold">
            Explanation:{" "}
          </h1>
          <div
            className={
              font.className +
              " text-lg whitespace-pre-wrap leading-snug text-pretty"
            }
          >
            <Markdown>{object.explanation || "Nothing...."}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Convertor;
