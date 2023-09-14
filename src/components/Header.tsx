import { Component, Show } from "solid-js";
import logo from "/logo.svg";
import { sourceCode } from "../store";

const Header: Component = () => (
  <nav class="container-fluid">
    <ul>
      <li>
        <a href="#">
          <img src={logo} alt="codesense" />
        </a>
      </li>
      <Show when={sourceCode() !== null} fallback={<li>CodeSense</li>}>
        <li>
          CodeSense:{" "}
          <a href={sourceCode()!.source} target="_blank">
            {sourceCode()!.name}
          </a>
        </li>
      </Show>
    </ul>
    <ul>
      <li>
        <a
          href="https://github.com/kothavade/CodeSense"
          class="contrast"
          target="_blank"
        >
          source
        </a>
      </li>
    </ul>
  </nav>
);

export default Header;
