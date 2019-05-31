import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getShow, getSeasons, getEpisodes, getCastCrew } from "../routines";
import { fetchData } from "../api";

export function* showSaga() {
  yield takeLatest(getShow.TRIGGER, getShowData);
  yield takeLatest(getSeasons.TRIGGER, getSeasonsData);
  yield takeLatest(getEpisodes.TRIGGER, getEpisodesData);
  yield takeLatest(getCastCrew.TRIGGER, getCastCrewData);
}

function* getShowData(action) {
  yield put(getShow.request());
  console.log(action.payload);
  const res = yield call(fetchData, action.payload);
  yield put(getShow.success(res.data));
  yield put(getShow.fulfill());
}
function* getSeasonsData(action) {
  yield put(getSeasons.request());
  console.log(action.payload);
  const res = yield call(fetchData, action.payload);
  yield put(getSeasons.success(res.data));
  yield put(getSeasons.fulfill());
}
function* getEpisodesData(action) {
  yield put(getEpisodes.request());
  console.log(action.payload);
  const res = yield call(fetchData, action.payload);
  yield put(getEpisodes.success(res.data));
  yield put(getEpisodes.fulfill());
}
function* getCastCrewData(action) {
  yield put(getCastCrew.request());
  const res = yield call(fetchData, action.payload);
  yield put(getCastCrew.success(res.data));

  yield put(getCastCrew.fulfill());
}
