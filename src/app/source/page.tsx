"use client";

import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";

import { Function, SupportedLanguage } from "@/lib/languages";
import { parse } from "@/lib/parse";
import { FunctionTable } from "@/components/function-table/function-table";
import { columns } from "@/components/function-table/columns";
import { Label } from "@/components/ui/label";
import LanguageSelect from "@/components/language-select";
import Link from "next/link";

export default function X() {
  const [functions, setFunctions] = useState<Function[]>([]);
  const [language, setLanguage] = useState<SupportedLanguage | null>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    async function update() {
      language && setFunctions(await parse(language, code));
    }
    update();
  }, [language, code]);

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto p-4 gap-1.5">
      <Link href="/" className="text-3xl font-bold pb-4">
        CodeSense
      </Link>
      <div className="flex flex-row gap-2">
        <Label htmlFor="code" className="flex-grow self-end">
          Source Code
        </Label>
        <LanguageSelect setLanguage={setLanguage} />
      </div>
      <div className="h-[30vh] overflow-auto">
        <Editor
          disabled={!language}
          id="code"
          onValueChange={(code) => setCode(code)}
          className="flex-grow font-mono text-sm  rounded-md min-h-[30vh]"
          value={code}
          padding={10}
          textareaClassName="rounded-md border border-input rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          // TODO: syntax highlighting based on selected language
          highlight={(code) => highlight(code, languages.clike, "c")}
          placeholder={
            !language
              ? "Select a language to start editing..."
              : `Enter ${language} code here...`
          }
        />
      </div>

      <FunctionTable
        columns={columns}
        data={functions ?? []}
        disabled={!language}
      />
    </div>
  );
}
