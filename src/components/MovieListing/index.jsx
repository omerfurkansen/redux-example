import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import "./MovieListing.scss";

export default function MovieListing() {
  const movies = useSelector((state) => state.movies.movies);

  const renderMovies = () => {
    return movies.map((movie, id) => {
      return <MovieCard key={id} data={movie} />;
    });
  };

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies()}</div>
      </div>
    </div>
  );
}
