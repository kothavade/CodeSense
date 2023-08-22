# 🌳🔍 treesearch

A [hoogle.haskell.org](https://hoogle.haskell.org/) inspired code search engine that works with any typed language (only support C and Rust for now, more to come).

Live demo available at [treesearch.kothavade.com](https://treesearch.kothavade.com)!

## Usage

Upload a `.c`, `.h` or `.rs` file, paste a link to **raw** source code (eg. a raw.githubusercontent.com link), or select one of the examples provided.

Then, search for a function by name, or by parameter types and return type--for example, if you want to find this function from `raylib.h`:

```c
Color ColorAlpha(Color color, float alpha);
```

you can search for it by name: `colora`, or by type: `Color, float -> Color`.

Searching is flexible--both `Color, float ->` and `-> Color` are valid searches, for example.

## Develop

### Using Nix

```sh
$ nix develop # or `direnv allow`, if you prefer
$ pnpm dev
```

### Other Package Managers

First, install the dependencies:

- [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) (or [Docker](https://www.docker.com/get-started/))
- [Tree-sitter CLI](https://github.com/tree-sitter/tree-sitter/blob/master/cli/README.md)
- NodeJS 18+
- [PNPM](https://pnpm.io/installation)

Then, set the node and WASM dependencies:

```sh
$ ./build-wasm.sh # Builds language-specific WASM binaries
$ pnpm i
$ pnpm wasm # Links main tree-sitter WASM binary from node_modules
$ pnpm dev
```

## Technology

- This application uses [Tree-sitter](https://tree-sitter.github.io/tree-sitter/), an incremental parsing library with support for almost every language[^1], compiled to [WebAssembly](https://webassembly.org) to parse source code in-browser
  - Functions, parameters, and return types are found using custom written Tree-sitter queries[^2], found in `/queries`
- The UI is build with [SolidJS](https://www.solidjs.com/)[^3] with [Vite](https://vitejs.dev/) as the build tool/bundler and [PicoCSS](https://picocss.com/) for styling

[^1]: https://tree-sitter.github.io/tree-sitter/#parsers
[^2]: https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
[^3]: basically fast react
