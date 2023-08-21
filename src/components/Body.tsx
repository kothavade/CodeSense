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

// @ts-ignore
import raylib from "/examples/raylib.h?url&raw";
// @ts-ignore
import stb_image from "/examples/stb_image.h?url&raw";

const sourceFromUrl = async (url: string) => {
  const file = await fetch(url).then((res) => res.text());
  setSourceCode({
    name: url.split("/").pop()!,
    content: file,
    extension: url.split(".").pop()!,
    source: url,
  });
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
              sourceFromUrl(url);
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
              onClick={() => {
                setSourceCode({
                  name: "raylib.h",
                  content: raylib,
                  extension: "h",
                  source: "/examples/raylib.h",
                });
              }}
            >
              Want an example? Try <code>raylib.h</code>
            </button>
            <button
              onClick={() => {
                setSourceCode({
                  name: "stb_image.h",
                  content: stb_image,
                  extension: "h",
                  source: "/examples/stb_image.h",
                });
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
