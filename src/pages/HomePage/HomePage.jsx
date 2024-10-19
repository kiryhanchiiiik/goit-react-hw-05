import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBkM2I2NDQwNzg4MDljZTgyNzFkNjU2NWM1MzM3MyIsIm5iZiI6MTcyOTE2MDg1MS42NzQ0NDksInN1YiI6IjY3MTBlMjY4MWY5ZDBlZTRiOGM5ZTVlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWn0-GyFX5q4F7rNDDnMncb_eG8CpB3ErOMOrdxIPBQ",
      },
    };
    const fetchMovies = async () => {
      const API_KEY = "5a0d3b644078809ce8271d6565c53373";
      const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

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
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loader && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
