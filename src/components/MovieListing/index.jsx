import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import "./MovieListing.scss";

export default function MovieListing() {
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.movies.series);
  const status = useSelector((state) => state.movies.status);

  const renderContent = (content) => {
    if (content && status === "idle") {
      return content.map((contentItem, id) => {
        return <MovieCard key={id} data={contentItem} />;
      });
    }
    if (status === "loading") {
      return <div className="movie-section">Loading...</div>;
    }
    return <div className="movie-section">Not Found</div>;
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
