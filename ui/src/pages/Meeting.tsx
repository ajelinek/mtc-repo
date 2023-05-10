import { Component } from "solid-js";
import {
  Router,
  useParams,
  useSearchParams,
  Route,
  Routes,
  Link
  } from "@solidjs/router";

export default function App() {
  const { id } = useParams<{id: string}>();
  return (
    <>
      <h2>Meeting {id}</h2>
    </>
  );
}
