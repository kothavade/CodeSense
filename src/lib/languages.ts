import { highlight, languages as prismLanguages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";

export const supportedLanguages = ["C", "Rust"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export type Language = {
  name: SupportedLanguage;
  extensions: string[];
  wip?: boolean;
  highlight: (code: string) => string;
};

export const languages: Record<SupportedLanguage, Language> = {
  "C": {
    name: "C",
    extensions: [".c", ".h"],
    highlight: (code: string) => highlight(code, prismLanguages.clike, "c"),
  },
  "Rust": {
    name: "Rust",
    extensions: [".rs"],
    wip: true,
    highlight: (code: string) => highlight(code, prismLanguages.rust, "rust"),
  },
};


export interface LanguageServer extends Language {
  parser: any;
  query: string;
}

export type Parameter = {
  type?: string;
  name: string;
};

export type Function = {
  key: number;
  name: string;
  returnType: string;
  parameters: Parameter[];
  body: string;
};

export type SourceCode = {
  name: string;
  content: string;
  extension: string;
  source: string;
};
