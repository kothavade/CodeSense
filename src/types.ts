export type Function = {
  name: string;
  returnType: string;
  parameters: String[];
  body: string;
  showBody: boolean;
};

export type SourceCode = {
  name: string;
  content: string;
  extension: string;
  source: string;
};

export type Language = {
  wasm: Uint8Array;
  query: string;
};
