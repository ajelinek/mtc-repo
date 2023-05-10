import { Component, lazy } from "solid-js";
import { Routes, Route, A } from "@solidjs/router";
const Meeting = lazy(() => import("./pages/Meeting"));
const NoMeeting = lazy(() => import("./pages/NoMeeting"));
const Home = lazy(() => import("./pages/Home"));

import "./styles/base-element.css"
import "./styles/design-tokens.css"
import "./styles/reset.css"
import styles from "./App.module.css";

export default function App() {
  return (
    <div class={styles.main}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/meeting/:id" component={Meeting} />
        <Route path="/meeting/" component={NoMeeting} />

        <Route
          path="/about"
          element={<div>This site was made with Solid</div>}
        />
      </Routes>
    </div>
  )
}
