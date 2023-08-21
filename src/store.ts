import { createSignal } from "solid-js";
import Parser from "web-tree-sitter";
import { SourceCode, Function } from "./types";
import { extensionToLanguage } from "./language";

export const [sourceCode, setSourceCode] = createSignal<SourceCode | null>(
  null
);
const [parser, setParser] = createSignal<Parser | null>(null);
export const [filtered, setFiltered] = createSignal<Function[]>([]);
export const [allFunctions, setAllFunctions] = createSignal<Function[]>([]);
export const [loading, setLoading] = createSignal<boolean>(true);

// When the source code changes, update functions
export const updateLanguage = async () => {
  setLoading(true);
  // If the parser is not initialized, initialize it
  if (parser() === null) {
    const initTime = performance.now();
    setParser(await initParser());
    console.log(
      "Initialized parser in " + (performance.now() - initTime) + "ms"
    );
  }
  // If the source code is not set, return
  const source = sourceCode();
  if (source === null) return;

  // Load the language into the parser
  const extension = source.extension;
  const l = extensionToLanguage(extension);
  const language = await Parser.Language.load(l.wasm);
  parser()!.setLanguage(language);

  const initTime = performance.now();
  const root = parser()!.parse(source.content).rootNode;
  const matches = language.query(l.query).matches(root);
  const functions = matches.map((match) => {
    const returnType = match.captures.find(
      (capture) => capture.name === "return_type"
    )?.node.text!;
    const name = match.captures.find(
      (capture) => capture.name === "function_name"
    )?.node.text!;
    const parameters = match.captures
      .filter((capture) => capture.name === "parameter_type")
      .map((capture) => capture.node.text);
    const body = match.captures.find(
      (capture) => capture.name === "function_body"
    )?.node.text!;
    return { returnType, name, parameters, body, showBody: false };
  });
  console.log(
    "Parsed " +
      functions.length +
      " functions in " +
      (performance.now() - initTime) +
      "ms"
  );
  setAllFunctions(functions);
  // Reset the filtered functions
  setFiltered(functions);
  setLoading(false);
};

// Init and set the parser
const initParser = async (): Promise<Parser> => {
  await Parser.init();
  return new Parser();
};
