"use client";

import React, { useState } from "react";
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
import { Copy } from "lucide-react";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const App = () => {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/codegen",
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });
  const [sourceCode, setSourceCode] = useState("// Write your code here");
  const [translatedCode, setTranslatedCode] = useState<string>();
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [translatedLanguage, setTranslatedLanguage] = useState("javascript");

  const prompted = ` convert this code from ${sourceLanguage} to ${translatedLanguage} : \n ${sourceCode}`;

  if (error) {
    toast.error("Failed to generate code");
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("Copied to clipboard");
      },
      function (err) {
        toast.error("Failed to copy to clipboard");
      }
    );
  }

  return (
    <div className="w-screen md:px-10 mt-10">
      <div className="grid gap-20 grid-cols-2 relative">
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setSourceLanguage} defaultValue="python">
              <SelectTrigger  >
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
              variant={"ghost"}
              size={"icon"}
              onClick={() => copy(sourceCode)}
            >
              <Copy />
            </Button>
          </div>
          <CodeEditor
            language={sourceLanguage}
            value={sourceCode}
            onChange={(value: any) => setSourceCode(value)}
          />
        </div>
        <Button
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          onClick={() => {
            submit(prompted);
          }}
          disabled={isLoading}
        >
          Translate
        </Button>
        <div className="flex flex-col">
          <div className="flex">
            <Select
              onValueChange={setTranslatedLanguage}
              defaultValue="javascript"
            >
              <SelectTrigger>
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
              variant={"ghost"}
              size={"icon"}
              onClick={() => copy(translatedCode || "")}
            >
              <Copy />
            </Button>
          </div>
          <CodeEditor
            language={translatedLanguage}
            value={object?.code || ""}
            onChange={(value: any) => setTranslatedCode(value)}
          />
        </div>
      </div>
      {object?.explanation && (
        <div className="mt-10">
          <Markdown>{object.explanation}</Markdown>
        </div>
      )}
    </div>
  );
};

export default App;
