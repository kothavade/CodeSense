import { defineConfig, Plugin } from "vite";
import solid from "vite-plugin-solid";
import { promises as fs } from "fs";

const bytesLoader: Plugin = {
  name: "bytes-loader",
  async transform(code, id) {
    const [path, query] = id.split("?");
    if (query != "bytes") return null;

    const file = await fs.readFile(path);
    const arrBuffer = file.buffer;
    const bytes = new Uint8Array(arrBuffer);
    return `export default new Uint8Array([${bytes.join(",")}])`;
  },
};

export default defineConfig({
  plugins: [bytesLoader, solid()],
});
