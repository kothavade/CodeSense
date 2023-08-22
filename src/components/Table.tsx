import { Component, For, Show } from "solid-js";
import { filtered, setFiltered } from "../store";
import { Function } from "../types";
const Table: Component = () => {
  const toggleBody = (func: Function) =>
    setFiltered((prev) =>
      prev.map((f) => (f === func ? { ...f, showBody: !f.showBody } : f)),
    );
  return (
    <table>
      <thead>
        <tr>
          <th /> {/* Empty cell for the arrow */}
          <th>Name</th>
          <th>Parameters</th>
          <th>Return Type</th>
        </tr>
      </thead>
      <tbody>
        <For each={filtered()}>
          {(func) => (
            <>
              <tr>
                <td
                  style={{
                    width: "7%",
                    padding: ".5em",
                    margin: 0,
                  }}
                >
                  <a
                    onClick={() => {
                      toggleBody(func);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      style={{
                        transform: func.showBody ? "rotate(180deg)" : "",
                      }}
                    >
                      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </a>
                </td>
                <td textContent={func.name} />
                <td textContent={func.parameters.join(", ")} />
                <td textContent={func.returnType} />
              </tr>
              <Show when={func.showBody} fallback={<tr />}>
                <tr>
                  <td style={{ width: "100%" }} />
                  <td colspan="3">
                    <code textContent={func.body} />
                  </td>
                </tr>
              </Show>
            </>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default Table;
