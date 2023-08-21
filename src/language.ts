import { Language } from "./types";

import c_query from "../queries/c.scm?raw";
// @ts-ignore
import c_wasm from "./assets/tree-sitter-c.wasm?bytes";
import rust_query from "../queries/rust.scm?raw";
// @ts-ignore
import rust_wasm from "./assets/tree-sitter-rust.wasm?bytes";

export const extensionToLanguage = (extension: string): Language => {
  switch (extension) {
    case "c":
    case "h":
      return { wasm: c_wasm, query: c_query };
    case "rs":
      return { wasm: rust_wasm, query: rust_query };
    default:
      throw new Error("Unsupported language");
  }
};
