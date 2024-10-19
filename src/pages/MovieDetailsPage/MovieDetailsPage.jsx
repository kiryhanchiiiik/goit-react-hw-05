import axios from "axios";
import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state?.from || "/movies";
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_KEY = "5a0d3b644078809ce8271d6565c53373";
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
      setLoader(true);
      try {
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const goBack = () => navigate(previousLocation);

  return (
    <div>
      <div>
        <button type="button" onClick={goBack}>
          Go Back
        </button>
      </div>

      {loader && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>User score: {movie.vote_average}%</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      <h4>Genres</h4>
      <p>
        {movie.genres && movie.genres.length > 0
          ? movie.genres.map((genre) => genre.name).join(", ")
          : "No genres available"}
      </p>
      <p>Additional information</p>

      <ul>
        <li>
          <Link to="cast" state={{ from: previousLocation }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: previousLocation }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
