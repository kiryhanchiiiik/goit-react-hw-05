import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  useEffect(() => {
    if (query) {
      const handleSearch = async () => {
        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBkM2I2NDQwNzg4MDljZTgyNzFkNjU2NWM1MzM3MyIsIm5iZiI6MTcyOTE2MDg1MS42NzQ0NDksInN1YiI6IjY3MTBlMjY4MWY5ZDBlZTRiOGM5ZTVlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWn0-GyFX5q4F7rNDDnMncb_eG8CpB3ErOMOrdxIPBQ",
          },
        };
        const API_KEY = "5a0d3b644078809ce8271d6565c53373";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        setLoader(true);
        try {
          const response = await axios.get(url, options);
          setMovies(response.data.results);
        } catch (error) {
          console.log(error);
          setError(true);
        } finally {
          setLoader(false);
        }
      };
      handleSearch();
    }
  }, [query]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const inputQuery = form.elements.query.value.trim();

    if (inputQuery) {
      setSearchParams({ query: inputQuery });
    }
  };
  return (
    <div>
      <h1>Search Movie</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input name="query" className={css.input} type="text" />
        <button type="submit">Search</button>
      </form>
      {loader && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      <MovieList movies={movies} query={query} />
    </div>
  );
};

export default MoviesPage;
