import React, { useEffect } from "react";
import MovieListing from "../MovieListing";
import movieApi from "../../common/movieApi";
import { OMDB_API_KEY } from "../../common/constants";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";

export default function Home() {
  const movieText = "Harry";
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await movieApi.get(`?apikey=${OMDB_API_KEY}&s=${movieText}&type=movie`).catch((error) => {
        console.log(error);
      });
      dispatch(addMovies(response.data.Search));
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
}
