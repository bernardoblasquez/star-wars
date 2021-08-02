import React from "react";
import { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

// https://swapi.dev/

function App() {
  
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null)

	const fetchMoviesHandler = useCallback( async () => {
		setIsLoading(true);
		setError(null)

		try{
			const response = await fetch("https://swapi.dev/api/films/");
			
			if (!response.ok){
				throw new Error('Something went wrong here!!') // jumps to catch if finds a error
			}
			
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
			setIsLoading(false);
		}
		catch (error) {
			setError(error.message)
			setIsLoading(false)
		}
		

	}, [])

	useEffect(() => { 
		fetchMoviesHandler()
	}, [fetchMoviesHandler]); // infinity loop
	
	const contentStateHandler = () => {
		let content = <p>Found no movies</p>;

		if (isLoading) {
			return <p>LOADING...</p>
		}

		if (error) {
			return <p>{error}</p>
		}

		if (movies.length > 0){
			return <MoviesList movies={movies} />
		}

		return content
	}
	

	return (
		<React.Fragment>
		<section>
			<button onClick={fetchMoviesHandler}>Fetch Movies</button>
		</section>
		<section>
			{ contentStateHandler() } 	
		</section>
		</React.Fragment>
	);
}

export default App;
