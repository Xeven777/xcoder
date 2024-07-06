"use client";

import React, { useState } from "react";
import CodeEditor from "@/components/Codeeditor";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { z } from "zod";
import { experimental_useObject as useObject } from "ai/react";
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
  const [generation, setGeneration] = useState<string>("");
  const [translatedCode, setTranslatedCode] = useState<string>();
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [translatedLanguage, setTranslatedLanguage] = useState("javascript");

  const prompted = ` convert this code from ${sourceLanguage} to ${translatedLanguage} : \n ${sourceCode}`;
  
  if (error) {
    toast.error("Failed to generate code");
  }

  return (
    <div className="w-screen md:px-10 mt-10">
      <div className="grid gap-20 grid-cols-2 relative">
        <div className="flex flex-col">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="typescript">TypeScript</option>
            {/* Add more languages as needed */}
          </select>
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
          <select
            value={translatedLanguage}
            onChange={(e) => setTranslatedLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="typescript">TypeScript</option>
          </select>
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
