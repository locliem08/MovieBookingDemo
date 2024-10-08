import { all } from 'redux-saga/effects';
import moviesSaga from './sagas/moviesSaga';
import bookedSaga from './sagas/bookedSaga';

export default function* rootSaga() {
  yield all([
    moviesSaga(),
    bookedSaga(),
  ]);
}
