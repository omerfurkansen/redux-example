import React, { useEffect } from "react";
import MovieListing from "../MovieListing";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncSeries } from "../../features/movies/movieSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncSeries());
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
}
