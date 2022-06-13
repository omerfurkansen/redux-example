import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../client/httpClient";
import { OMDB_API_KEY } from "../../common/constants";

const initialState = {
  movies: [],
  series: [],
  selectedContent: null,
  status: "idle", // loading, idle, error
  search: false,
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async (movieText = "Harry") => {
  await wait(1000);
  movieText = movieText.toLowerCase();
  const response = await httpClient.get(`?apikey=${OMDB_API_KEY}&s=${movieText}&type=movie`);
  return response.data.Search;
});

export const fetchAsyncSeries = createAsyncThunk("movies/fetchAsyncSeries", async (serieText = "Friends") => {
  await wait(1000);
  serieText = serieText.toLowerCase();
  const response = await httpClient.get(`?apikey=${OMDB_API_KEY}&s=${serieText}&type=series`);
  return response.data.Search;
});

export const fetchAsyncContentDetail = createAsyncThunk("movies/fetchAsyncContentDetail", async (imdbID) => {
  await wait(1000);
  const response = await httpClient.get(`?apikey=${OMDB_API_KEY}&i=${imdbID}&Plot=full`);
  return response.data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedContent: (state) => {
      state.selectedContent = null;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      state.status = "loading";
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
    [fetchAsyncContentDetail.pending]: (state) => {
      state.status = "loading";
    },
  },
});

export const { removeSelectedContent, setSearch } = movieSlice.actions;

export default movieSlice.reducer;
