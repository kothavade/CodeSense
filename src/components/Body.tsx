import { Component, Show, createEffect, createSignal } from "solid-js";
import { createFileUploader } from "@solid-primitives/upload";
import { filter } from "../filter";
import {
  sourceCode,
  setSourceCode,
  updateLanguage,
  setFiltered,
  allFunctions,
  loading,
} from "../store";
import { SourceCode } from "../types";
import Table from "./Table";

const sourceFromUrl = async (url: string): Promise<SourceCode> => {
  const file = await fetch(url).then((res) => res.text());
  return {
    name: url.split("/").pop()!,
    content: file,
    extension: url.split(".").pop()!,
    source: url,
  };
};

const Body: Component = () => {
  const { selectFiles } = createFileUploader();
  let search: HTMLInputElement | undefined;

  const [uploading, setUploading] = createSignal(false);
  createEffect(updateLanguage);

  return (
    <>
      <div class="grid">
        <button
          aria-busy={uploading()}
          onClick={() => {
            setUploading(true);
            search!.value = "";
            selectFiles(async ([{ file, name, source }]) => {
              const sourceCode: SourceCode = {
                name: name,
                content: await file.text(),
                extension: name.split(".").pop()!,
                source: source,
              };
              setSourceCode(sourceCode);
              setUploading(false);
            });
            setTimeout(() => {
              setUploading(false);
            }, 5000);
          }}
          textContent={uploading() ? "Uploading..." : "Upload"}
        />
        <button
          onClick={async () => {
            const url = prompt("Enter URL to Source File");
            if (url) {
              setSourceCode(await sourceFromUrl(url));
            }
          }}
        >
          Paste URL
        </button>
        <button
          class="secondary"
          onClick={() => {
            search!.value = "";
            setSourceCode(null);
          }}
        >
          Reset
        </button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        ref={search}
        onInput={(e) => {
          const value = e.currentTarget.value.toLowerCase().trim();
          setFiltered(filter(value, allFunctions()));
        }}
      />
      <Show
        when={sourceCode() || !loading()}
        fallback={
          <div class="grid">
            <button
              onClick={async () => {
                const raylib = await sourceFromUrl(
                  "https://raw.githubusercontent.com/raysan5/raylib/master/src/raylib.h"
                );
                raylib.content = raylib.content.replace(/RLAPI/g, "");
                setSourceCode(raylib);
              }}
            >
              Want an example? Try <code>raylib.h</code>
            </button>
            <button
              onClick={async () => {
                const stb_image = await sourceFromUrl(
                  "https://raw.githubusercontent.com/nothings/stb/master/stb_image.h"
                );
                stb_image.content = stb_image.content.replace(/STBIDEF/g, "");
                setSourceCode(stb_image);
              }}
            >
              Or <code>stb_image.h</code>
            </button>
          </div>
        }
      >
        <Table />
      </Show>
    </>
  );
};

export default Body;
