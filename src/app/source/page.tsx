"use client";

import { useState } from "react";
import Editor from "react-simple-code-editor";

import {
  Function,
  SupportedLanguage,
  languages,
} from "@/lib/languages";
import { parse } from "@/lib/parse";
import { FunctionTable } from "@/components/function-table/function-table";
import { columns } from "@/components/function-table/columns";
import { Label } from "@/components/ui/label";
import LanguageSelect from "@/components/language-select";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import useDebounce from "@/lib/useDebounce";

export default function X() {
  const [functions, setFunctions] = useState<Function[]>([]);
  const [languageName, setLanguageName] = useState<SupportedLanguage | null>(
    null
  );
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useDebounce(
    async () => {
      if (!languageName || !code) {
        setFunctions([]);
        setLoading(false);
        return;
      }
      setFunctions(await parse(languageName, code));
      setLoading(false);
    },
    [code, languageName],
    200
  );

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto p-4 gap-1.5">
      <div className="flex flex-row">
        <Link
          href="/"
          className="text-3xl font-bold pb-4 flex-grow hover:underline"
        >
          CodeSense
        </Link>
        <ModeToggle />
      </div>
      <div className="flex flex-row gap-2">
        <Label htmlFor="code" className="flex-grow self-end">
          Source Code
        </Label>
        <LanguageSelect setLanguage={setLanguageName} />
      </div>
      <div className="h-[30vh] overflow-auto border border-neutral-foreground rounded-md">
        <Editor
          disabled={!languageName}
          id="code"
          onValueChange={(code) => {
            setLoading(true);
            setCode(code);
          }}
          className="flex-grow font-mono text-sm rounded-md min-h-[30vh]"
          value={code}
          padding={10}
          textareaClassName="rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          // TODO: syntax highlighting based on selected language
          highlight={(code) =>
            languageName ? languages[languageName].highlight(code) : code
          }
          placeholder={
            !languageName
              ? "Select a language to start editing..."
              : `Enter ${languageName} code here...`
          }
        />
      </div>

      <FunctionTable
        columns={columns}
        data={functions ?? []}
        disabled={!languageName}
        loading={loading}
      />
    </div>
  );
}
