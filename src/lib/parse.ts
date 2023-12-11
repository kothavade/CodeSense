"use server";

import Parser, { Query } from "tree-sitter";
import { Function, SupportedLanguage } from "@/lib/languages";
import { languagesServer } from "@/lib/languages_server";
import { log } from "@/lib/log";

log("Creating parser");
const parser = new Parser();

export async function parse(
  name: SupportedLanguage,
  sourceCode: string
): Promise<Function[]> {
  const language = languagesServer[name];
  if (parser.getLanguage() !== language.parser) {
    log("Setting language to", language.name);
    parser.setLanguage(language.parser);
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
    const parameter_types = captures
      .filter(({ name }) => name === "parameter_type")
      .map(({ node }) => node.text);
    const parameter_names = captures
      .filter(({ name }) => name === "parameter_name")
      .map(({ node }) => node.text);
    const parameters = parameter_names.map((name, index) => ({
      name,
      type: parameter_types[index],
    }));
    const body = captures.find(({ name }) => name === "function_body")?.node
      .text!;
    return { key: index, returnType, name, parameters, body };
  });
  return functions;
}
