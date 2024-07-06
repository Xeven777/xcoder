import React from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ language, value, onChange }: any) => {
  return (
    <Editor
      height="80vh"
      language={language}
      value={value}
      theme="vs-dark"
      onChange={onChange}
      options={{
        selectOnLineNumbers: true,
      }}
    />
  );
};

export default CodeEditor;
