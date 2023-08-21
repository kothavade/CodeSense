/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/* @refresh reload */
import { render } from "solid-js/web";
import "@picocss/pico";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
