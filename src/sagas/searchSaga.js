import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { searchShows, searchNames, liveSearch, clearSearch } from "../routines";
import { fetchData } from "../api";

export function* namesSaga() {
  yield takeLatest(searchShows.TRIGGER, fetchShows);
  yield takeLatest(searchNames.TRIGGER, fetchNames);
  yield takeEvery(liveSearch.TRIGGER, searchbarFetch);
  yield takeLatest(clearSearch.TRIGGER, searchClear);
}

function* searchbarFetch(action) {
  yield put(liveSearch.request());
  const res = yield call(fetchData, action.payload);
  yield put(liveSearch.success(res.data));
  yield put(liveSearch.fulfill());
}
function* fetchShows(action) {
  yield put(searchShows.request());
  const res = yield call(fetchData, action.payload);
  yield put(searchShows.success(res.data));
  yield put(searchShows.fulfill());
}
function* fetchNames(action) {
  yield put(searchNames.request());
  const res = yield call(fetchData, action.payload);
  yield put(searchNames.success(res.data));
  yield put(searchNames.fulfill());
}

function* searchClear(action) {
  yield put(clearSearch.fulfill(action.payload));
}
