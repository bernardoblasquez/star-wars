import React from "react";
import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

// https://swapi.dev/

function App() {
  
	const [movies, setMovies] = useState([])

	async function fetchMoviesHandler() {
		
		const response = await fetch("https://swapi.dev/api/films/");
		const data = await response.json();
	
		const transformedMovieData =  data.results.map( movieData => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_data
				};
			}
		)

		setMovies(transformedMovieData);
	}
	

	return (
		<React.Fragment>
		<section>
			<button onClick={fetchMoviesHandler}>Fetch Movies</button>
		</section>
		<section>
			<MoviesList movies={movies} />			
		</section>
		</React.Fragment>
	);
}

export default App;
