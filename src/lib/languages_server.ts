// @ts-ignore
import C from "tree-sitter-c";
// @ts-ignore
import Rust from "tree-sitter-rust";
import c_query from "@/queries/c.scm";
import rust_query from "@/queries/rust.scm";
import { LanguageServer, SupportedLanguage, languages } from "@/lib/languages";

export const languagesServer: Record<SupportedLanguage, LanguageServer> = {
  "C": {
    ...languages["C"],
    query: c_query,
    parser: C,
  },
  "Rust": {
    ...languages["Rust"],
    query: rust_query,
    parser: Rust,
    wip: true,
  },
};