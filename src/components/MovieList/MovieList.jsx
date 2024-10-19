import { Link } from "react-router-dom";
const MovieList = ({ movies, query }) => {
  return (
    <ul>
      {movies !== null &&
        movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: query ? `/movies?query=${query}` : "/" }}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
