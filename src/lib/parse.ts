"use server";

import Parser, { Query } from "tree-sitter";
import { Function } from "@/lib/languages";
import { getLanguage } from "@/lib/languages_server";
import { log } from "@/lib/log";

log("Creating parser");
const parser = new Parser();

export async function parse(
  name: string,
  sourceCode: string
): Promise<Function[]> {
  "use server";
  const language = getLanguage(name);
  if (!language || !language.parser) {
    log("Language not found");
    throw new Error("Language not found");
  }
  if (parser.getLanguage() !== language.parser) {
    log("Setting language to", language.name);
    parser.setLanguage(language.parser);
  } else {
    log("Language already set");
  }
  const rootNode = parser.parse(sourceCode).rootNode;
  const query = new Query(language.parser, language.query);
  const matches = query.matches(rootNode);
  const functions = matches.map((match, index) => {
    const { captures } = match;
    const returnType = captures.find(({ name }) => name === "return_type")?.node
      .text!;
    const name = captures.find(({ name }) => name === "function_name")?.node
      .text!;
    const parameters = captures
      .filter(({ name }) => name === "parameter_type")
      .map(({ node }) => node.text);
    const body = captures.find(({ name }) => name === "function_body")?.node
      .text!;
    return { key: index, returnType, name, parameters, body };
  });
  return functions;
}
