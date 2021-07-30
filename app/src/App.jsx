import React from "react";
import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

// https://swapi.dev/

function App() {

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList />
      </section>
    </React.Fragment>
  );
}

export default App;
