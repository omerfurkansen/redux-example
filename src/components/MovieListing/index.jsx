import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import "./MovieListing.scss";

export default function MovieListing() {
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.movies.series);

  const renderContent = (content) => {
    if (content) {
      return content.map((contentItem, id) => {
        return <MovieCard key={id} data={contentItem} />;
      });
    }
  };

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderContent(movies)}</div>
      </div>
      <div className="series-list">
        <h2>Series</h2>
        <div className="movie-container">{renderContent(series)}</div>
      </div>
    </div>
  );
}
