import React, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncContentDetail } from "../../features/movies/movieSlice";
import { removeSelectedContent } from "../../features/movies/movieSlice";

export default function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const selectedContent = useSelector((state) => state.movies.selectedContent);
  const status = useSelector((state) => state.movies.status);

  const renderContent = () => {
    if (selectedContent && status === "idle") {
      return (
        <div className="movie-section">
          <div className="section-left">
            <div className="movie-title">{selectedContent.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star" /> : {selectedContent.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-users" /> : {selectedContent.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-clock" /> : {selectedContent.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar" /> : {selectedContent.Year}
              </span>
            </div>
            <div className="movie-plot">{selectedContent.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{selectedContent.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{selectedContent.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{selectedContent.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{selectedContent.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{selectedContent.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={selectedContent.Poster} alt={selectedContent.Title} />
          </div>
        </div>
      );
    }
    if (status === "loading") {
      return <div className="movie-section">Loading...</div>;
    }
    return <div className="movie-section">Not Found</div>;
  };

  useEffect(() => {
    dispatch(fetchAsyncContentDetail(imdbID));
    // write callback function to remove selected content
    return () => {
      dispatch(removeSelectedContent());
    };
  }, [dispatch, imdbID]);

  return <div>{renderContent()}</div>;
}
