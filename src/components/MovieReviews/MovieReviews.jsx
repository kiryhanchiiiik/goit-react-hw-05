import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const API_KEY = "5a0d3b644078809ce8271d6565c53373";
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setReviews(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul>
      {reviews.length === 0 ? (
        <li>No reviews available</li>
      ) : (
        reviews.map((review) => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default MovieReviews;
