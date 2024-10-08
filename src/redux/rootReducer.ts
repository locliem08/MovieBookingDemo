import { combineReducers } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import favoritesReducer from './slices/favoritesSlice';
import bookedReducer from './slices/bookedSlice';

const rootReducer = combineReducers({
    movies: moviesReducer,
    favorites: favoritesReducer,
    booked: bookedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
