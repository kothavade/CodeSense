export const supportedLanguages = ["C", "Rust"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export type LanguageInfo = {
  name: SupportedLanguage;
  extensions: string[];
  wip?: boolean;
};

export const languageInfo: LanguageInfo[] = [
  {
    name: "C",
    extensions: [".c", ".h"],
  },
  {
    name: "Rust",
    extensions: [".rs"],
    wip: true,
  },
];

export interface Language extends LanguageInfo {
  parser: any;
  query: string;
}

export type Function = {
  key: number;
  name: string;
  returnType: string;
  parameters: String[];
  body: string;
};

export type SourceCode = {
  name: string;
  content: string;
  extension: string;
  source: string;
};
