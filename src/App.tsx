import { Component, lazy } from "solid-js";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Body = lazy(() => import("./components/Body"));

const App: Component = () => (
  <>
    <Header />
    <div class="main">
      <Body />
      <Footer />
    </div>
  </>
);

export default App;
