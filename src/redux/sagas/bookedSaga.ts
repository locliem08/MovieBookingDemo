import { takeLatest, put } from 'redux-saga/effects';
import { bookMovie, removeBooked } from '../slices/bookedSlice';
import { updateBookedStatus } from '../slices/moviesSlice';
import { Movie } from '../../types';

function* handleBookMovie(action: ReturnType<typeof bookMovie>) {
  const movie: Movie = action.payload;
  // Cập nhật trạng thái đã đặt vé trong moviesSlice
  yield put(updateBookedStatus({ id: movie.id, booked: true }));
}

function* handleRemoveBooked(action: ReturnType<typeof removeBooked>) {
  const movieId: number = action.payload;
  // Cập nhật trạng thái đã đặt vé trong moviesSlice
  yield put(updateBookedStatus({ id: movieId, booked: false }));
}

export default function* bookedSaga() {
  yield takeLatest(bookMovie.type, handleBookMovie);
  yield takeLatest(removeBooked.type, handleRemoveBooked);
}
