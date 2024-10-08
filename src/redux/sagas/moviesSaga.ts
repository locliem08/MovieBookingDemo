import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from '../slices/moviesSlice';
import { Movie } from '../../types';
import { getListMovie } from '../../services/apisMovie';

function* fetchMovies() {
  try {
    const movies: Movie[] = yield call(getListMovie, 1000);
    yield put(fetchMoviesSuccess(movies));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
  }
}

export default function* moviesSaga() {
  yield takeLatest(fetchMoviesRequest.type, fetchMovies);
}
