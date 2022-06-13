import React, { useEffect } from "react";
import MovieListing from "../components/Movie/MovieListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovies, fetchAsyncSeries } from "../features/movies/movieSlice";

export default function Home() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.movies.search);

  useEffect(() => {
    if (!search) {
      dispatch(fetchAsyncMovies());
      dispatch(fetchAsyncSeries());
    }
  }, [dispatch, search]);

  return <MovieListing />;
}
