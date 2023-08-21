import { Function } from "./types";

export const filter = (query: string, functions: Function[]): Function[] => {
  // combine filters and return the result
  return [...filterByName(query, functions), ...filterByType(query, functions)];
};

const filterByName = (query: string, functions: Function[]): Function[] =>
  functions.filter((func) =>
    func.name.toLowerCase().includes(query.toLowerCase()),
  );

const filterByType = (query: string, functions: Function[]): Function[] => {
  try {
    let parameters = query
      .split("->")[0]
      .split(",")
      .map((param) => param.trim());
    let returnType = query.split("->")[1].trim();
    return functions.filter((func) => {
      let match = true;
      if (parameters.length > 0) {
        match =
          match &&
          parameters.every((param) =>
            func.parameters.some((funcParam) =>
              funcParam.toLowerCase().includes(param),
            ),
          );
      }
      if (returnType.length > 0) {
        match = match && func.returnType.toLowerCase().includes(returnType);
      }
      return match;
    });
  } catch (e) {
    return [];
  }
};
