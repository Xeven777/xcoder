"use client";

import React, { useState } from "react";
import CodeEditor from "@/components/Codeeditor";
import { Button } from "@/components/ui/button";
import { codeConvert } from "./actions";
import { readStreamableValue } from "ai/rsc";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const App = () => {
  const [sourceCode, setSourceCode] = useState("// Write your code here");
  const [generation, setGeneration] = useState<string>("");
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [translatedLanguage, setTranslatedLanguage] = useState("javascript");

  const handleTranslate = async () => {
    console.log("Translating code...", sourceCode);
    const { output } = await codeConvert(
      sourceCode,
      sourceLanguage,
      translatedLanguage
    );

    for await (const delta of readStreamableValue(output)) {
      setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

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
          onClick={handleTranslate}
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
            value={generation || "// Translated code will appear here"}
            onChange={(value: any) => setGeneration(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
