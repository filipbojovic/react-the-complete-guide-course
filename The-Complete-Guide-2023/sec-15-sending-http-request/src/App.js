import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList';
import './App.css';

// Axios throws actual errors and their codes, while Fetch API doesn’t
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // async function fetchMoviesHandler() {
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-faa69-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
      if (!response.ok) {
        throw new Error('Something bad happened!');
      }

      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releasedate: data[key].releasedate,
          openingText: data[key].openingText
        });
      };

      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  // if we add function as a dependency, an inf loop will be created because functions changes on each component evaluation.
  // but with the usage of useCallback this problem is solved and the function will be called only when its prev state differs from the cur one


  let content = <p>Found no movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }

  async function addMovieHandler(movie) {
    const res = await fetch('https://react-http-faa69-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
  }

  // in order to catch errors below (when not working with async await), .catch() should be used.
  // const fetchMoviesHandler = () => {
  //   // from fetch api
  //   fetch('https://swapi.dev/api/films').then(res => {
  //     return res.json(); // .json() will transform json to JS object
  //   }).then(data => {
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         releaseDate: movieData.release_date,
  //         openingTest: movieData.opening_crawl
  //       };
  //     })
  //     setMovies(transformedMovies);
  //   })
  // }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
