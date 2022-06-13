import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import MovieListing from '../components/Movie/MovieListing';
import { fetchAsyncMovies, fetchAsyncSeries, selectSearch } from '../features/movies/movieSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  useEffect(() => {
    if (!search) {
      dispatch(fetchAsyncMovies());
      dispatch(fetchAsyncSeries());
    }
  }, [dispatch, search]);

  return <MovieListing />;
}
