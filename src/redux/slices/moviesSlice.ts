import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

interface MoviesState {
  allMovies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  allMovies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
      state.loading = false;
      state.allMovies = action.payload;
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookedStatus(state, action: PayloadAction<{ id: number; booked: boolean }>) {
      const movie = state.allMovies.find(m => m.id === action.payload.id);
      if (movie) {
        movie.booked = action.payload.booked;
      }
    },
  },
});

export const {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  updateBookedStatus,
} = moviesSlice.actions;

export default moviesSlice.reducer;
