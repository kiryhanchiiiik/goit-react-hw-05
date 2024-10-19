import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const API_KEY = "5a0d3b644078809ce8271d6565c53373";
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setCast(response.data.cast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul>
      {cast.length === 0 ? (
        <li>No cast available</li>
      ) : (
        cast.map((member) => (
          <li key={member.id}>
            <h3>{member.name}</h3>
            <p>Character: {member.character}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default MovieCast;
