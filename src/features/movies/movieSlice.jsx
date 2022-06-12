import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/movieApi";
import { OMDB_API_KEY } from "../../common/constants";

const initialState = {
  movies: [],
  series: [],
  selectedContent: null,
  status: "success", // loading, success, error
};

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async () => {
  const movieText = "Harry";
  const response = await movieApi.get(`?apikey=${OMDB_API_KEY}&s=${movieText}&type=movie`);
  return response.data.Search;
});

export const fetchAsyncSeries = createAsyncThunk("movies/fetchAsyncSeries", async () => {
  const movieText = "Friends";
  const response = await movieApi.get(`?apikey=${OMDB_API_KEY}&s=${movieText}&type=series`);
  return response.data.Search;
});

export const fetchAsyncContentDetail = createAsyncThunk("movies/fetchAsyncContentDetail", async (imdbID) => {
  const response = await movieApi.get(`?apikey=${OMDB_API_KEY}&i=${imdbID}&Plot=full`);
  return response.data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      state.status = "loading";
      state.movies = [];
    },
    [fetchAsyncMovies.fulfilled]: (state, action) => {
      state.status = "idle";
      state.movies = action.payload;
    },
    [fetchAsyncMovies.rejected]: (state) => {
      state.status = "error";
      state.movies = [];
    },
    [fetchAsyncSeries.fulfilled]: (state, action) => {
      state.status = "idle";
      state.series = action.payload;
    },
    [fetchAsyncContentDetail.fulfilled]: (state, action) => {
      state.status = "idle";
      state.selectedContent = action.payload;
    },
  },
});

export const { addMovies } = movieSlice.actions;

export default movieSlice.reducer;
