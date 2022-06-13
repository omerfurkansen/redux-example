import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import httpClient from '../../client/httpClient';
import { OMDB_API_KEY } from '../../common/constants';
import { MovieState } from '../../types';

const initialState: MovieState = {
  movies: [],
  series: [],
  selectedContent: null,
  status: 'idle',
  search: false,
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (movieText: string = 'Harry') => {
  await wait(1000);
  movieText = movieText.toLowerCase();
  const response = await httpClient.get(`?apikey=${OMDB_API_KEY}&s=${movieText}&type=movie`);
  return response.data.Search;
});

export const fetchAsyncSeries = createAsyncThunk('movies/fetchAsyncSeries', async (serieText: string = 'Friends') => {
  await wait(1000);
  serieText = serieText.toLowerCase();
  const response = await httpClient.get(`?apikey=${OMDB_API_KEY}&s=${serieText}&type=series`);
  return response.data.Search;
});

export const fetchAsyncContentDetail = createAsyncThunk('movies/fetchAsyncContentDetail', async (imdbID: string) => {
  await wait(1000);
  const response = await httpClient.get(`?apikey=${OMDB_API_KEY}&i=${imdbID}&Plot=full`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedContent: (state) => {
      state.selectedContent = null;
    },
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAsyncSeries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncSeries.fulfilled, (state, action) => {
        state.series = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAsyncSeries.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAsyncContentDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncContentDetail.fulfilled, (state, action) => {
        state.selectedContent = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAsyncContentDetail.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { removeSelectedContent, setSearch } = movieSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectSeries = (state: RootState) => state.movies.series;
export const selectSelectedContent = (state: RootState) => state.movies.selectedContent;
export const selectStatus = (state: RootState) => state.movies.status;
export const selectSearch = (state: RootState) => state.movies.search;

export default movieSlice.reducer;
