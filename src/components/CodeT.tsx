"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { Copy, Loader } from "lucide-react";
import { languageOptions, codeSnippets } from "@/lib/data";
import { toast } from "sonner";
import { codeConvert } from "@/app/actions";


export function Translator() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[14]
  );
  const [convertToLanguage, setConvertToLanguage] = useState<string>(
    languageOptions[23]
  );

  const [codeSnippet, setCodeSnippet] = useState<string>(
    codeSnippets[selectedLanguage.replace(/ /g, "-")]
  );

  const handleLanguageChange = (option: string) => {
    setSelectedLanguage(option);
    setCodeSnippet(codeSnippets[option.replace(/ /g, "-")]);
  };

  const handleToLanguageChange = (option: string) => {
    setConvertedCode("");
    setConvertToLanguage(option);
  };

  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleOnchange(value: string | undefined) {
    if (value) {
      setCodeSnippet(value);
    }
  }

  const [convertedCode, setConvertedCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const convertCodeByGemini = async () => {
    setLoading(true);
    const response = await codeConvert(
      codeSnippet,
      selectedLanguage,
      convertToLanguage
    );
    setLoading(false);
    if (!response.startsWith("`")) {
      toast.error("An error occurred while translating the code");
    }
    if (response.startsWith("`")) {
      toast.success("Code Translated Successfully");
    }
    setConvertedCode(
      response.startsWith("`")
        ? response.split("\n").slice(1, -1).join("\n")
        : response
    );
  };

  const handleNotConvertedCodeCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    toast.success("Code Copied Successfully");
  };

  const handleConvertedCodeCopy = () => {
    navigator.clipboard.writeText(convertedCode);
    toast.success("Code Copied Successfully");
  };

  return (
    <div className="speech-area overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-6 w-full px-4 md:px-0 mb-12">
        <div className="flex flex-wrap lg:flex-row lg:flex-nowrap justify-center items-center w-full max-w-7xl p-2 gap-4">
          <div className="w-full lg:flex-1 lg:w-96 bg-neutral-800">
            <div className="flex items-center justify-between bg-neutral-800 text-white p-2 rounded-t">
              <Select
                onValueChange={(value: string) => handleLanguageChange(value)}
              >
                <SelectTrigger className="border-none outline-none bg-neutral-800 text-white font-semibold">
                  {`${selectedLanguage
                    .charAt(0)
                    .toUpperCase()}${selectedLanguage.slice(1)}`}
                </SelectTrigger>
                <SelectContent className="border-none outline-none bg-neutral-900 text-white font-semibold">
                  <SelectGroup>
                    <SelectLabel>Select a language</SelectLabel>
                    {languageOptions.map((option, index: number) => (
                      <SelectItem
                        key={index}
                        value={option.toLowerCase().replace(/ /g, "-")}
                        className="border-none outline-none"
                      >
                        {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400"
                onClick={handleNotConvertedCodeCopy}
              >
                <Copy size={18} />
              </Button>
            </div>
            <Editor
              theme="vs-dark"
              height="500px"
              loading={
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                </>
              }
              defaultLanguage={selectedLanguage}
              defaultValue={codeSnippet}
              onMount={handleEditorDidMount}
              value={codeSnippet}
              onChange={handleOnchange}
              language={selectedLanguage}
              options={{ wordWrap: "on", scrollbar: { vertical: "hidden" } }}
              className="border-r border-l border-b border-gray-500 border-opacity-30"
            />
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400"
              onClick={convertCodeByGemini}
            >
              {loading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span className="lg:hidden text-xl mr-3">Swap</span>
                  <ShuffleIcon className="w-6 h-6" />
                </>
              )}
            </Button>
          </div>
          <div className="w-full lg:flex-1 lg:w-96 bg-neutral-800">
            <div className="flex items-center justify-between bg-neutral-800 text-white p-2 rounded-t">
              <Select
                onValueChange={(value: string) => handleToLanguageChange(value)}
              >
                <SelectTrigger className="border-none outline-none bg-neutral-800 font-semibold text-white">
                  {`${convertToLanguage
                    .charAt(0)
                    .toUpperCase()}${convertToLanguage.slice(1)}`}
                </SelectTrigger>
                <SelectContent className="border-none outline-none bg-neutral-900 text-white font-semibold">
                  <SelectGroup>
                    <SelectLabel>Select a language</SelectLabel>
                    {languageOptions.map((option, index: number) => (
                      <SelectItem
                        key={index}
                        value={option.toLowerCase().replace(/ /g, "-")}
                        className="border-none outline-none"
                      >
                        {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Copy size={18} onClick={handleConvertedCodeCopy} />
              </Button>
            </div>
            <Editor
              theme="vs-dark"
              height="500px"
              defaultLanguage={convertToLanguage}
              defaultValue={convertedCode}
              loading={
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                </>
              }
              // Uneditable
              options={{
                readOnly: true,
                wordWrap: "on",
                scrollbar: { vertical: "hidden" },
              }}
              value={convertedCode}
              language={convertToLanguage}
              onMount={handleEditorDidMount}
              className="border-r border-l border-b border-gray-500 border-opacity-30"
            />
          </div>
        </div>
      </div>
      <div className="speech-shape-wrap">
        <div className="shape-one" data-background="/speech_shape01.png" />
        <div className="shape-two" data-background="/speech_shape02.png" />
      </div>
    </div>
  );
}

function ShuffleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}
