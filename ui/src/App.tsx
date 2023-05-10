import { Component, lazy } from "solid-js";
import { Routes, Route, A } from "@solidjs/router";
const Meeting = lazy(() => import("./pages/Meeting"));
const NoMeeting = lazy(() => import("./pages/NoMeeting"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <>
      <h1>Lean Coffee</h1>
      <nav>
        <ul>
          <li>
            <A href="/">Lean Coffee</A>
          </li>
          <li>
            <A href="/meeting">New Meeting</A>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/meeting/:id" component={Meeting} />
        <Route path="/meeting/" component={NoMeeting} />

        <Route
          path="/about"
          element={<div>This site was made with Solid</div>}
        />
      </Routes>
    </>
  )
}
