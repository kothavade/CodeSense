// @ts-ignore
import C from "tree-sitter-c";
// @ts-ignore
import Rust from "tree-sitter-rust";
import c_query from "@/queries/c.scm";
import rust_query from "@/queries/rust.scm";
import { Language, languageInfo } from "@/lib/languages";

export const languages: Language[] = [
  {
    ...languageInfo[0],
    query: c_query,
    parser: C,
  },
  {
    ...languageInfo[1],
    query: rust_query,
    parser: Rust,
    wip: true,
  },
];

export function getLanguage(name: string): Language | null {
  return languages.find((lang) => lang.name === name) || null;
}
