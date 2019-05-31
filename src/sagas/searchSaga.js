import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  searchShows,
  searchNames,
  liveSearchNames,
  liveSearchShows,
  liveSearch,
  clearSearch
} from "../routines";
import { fetchData } from "../api";

export function* namesSaga() {
  yield takeLatest(searchShows.TRIGGER, fetchShows);
  yield takeLatest(searchNames.TRIGGER, fetchNames);
  yield takeLatest(liveSearchShows.TRIGGER, searchbarShows);
  yield takeLatest(liveSearchNames.TRIGGER, searchbarNames);
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
  console.log(action.payload);
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
function* searchbarShows(action) {
  yield put(liveSearchShows.request());
  const res = yield call(fetchData, action.payload);
  yield put(liveSearchShows.success(res.data));
  yield put(liveSearchShows.fulfill());
}
function* searchbarNames(action) {
  yield put(liveSearchNames.request());
  const res = yield call(fetchData, action.payload);
  yield put(liveSearchNames.success(res.data));
  yield put(liveSearchNames.fulfill());
}
function* searchClear(action) {
  yield put(clearSearch.fulfill(action.payload));
}
