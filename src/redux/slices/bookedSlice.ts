import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

interface BookedState {
  booked: Movie[];
}

const initialState: BookedState = {
  booked: [],
};

const bookedSlice = createSlice({
  name: 'booked',
  initialState,
  reducers: {
    bookMovie(state, action: PayloadAction<Movie>) {
      state.booked.push({...action.payload, booked: true});
    },
    removeBooked(state, action: PayloadAction<number>) {
      state.booked = state.booked.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { bookMovie, removeBooked } = bookedSlice.actions;
export default bookedSlice.reducer;
