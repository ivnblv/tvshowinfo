import { call, put, takeEvery } from "redux-saga/effects";
import { getShow, getSeasons, getEpisodes, getCastCrew } from "../routines";
import { fetchData } from "../api";

export function* showSaga() {
  yield takeEvery(getShow.TRIGGER, getShowData);
  yield takeEvery(getSeasons.TRIGGER, getSeasonsData);
  yield takeEvery(getEpisodes.TRIGGER, getEpisodesData);
  yield takeEvery(getCastCrew.TRIGGER, getCastCrewData);
}

function* getShowData(action) {
  yield put(getShow.request());
  const res = yield call(fetchData, action.payload);
  yield put(getShow.success(res.data));
  yield put(getShow.fulfill());
}
function* getSeasonsData(action) {
  yield put(getSeasons.request());
  const res = yield call(fetchData, action.payload);
  yield put(getSeasons.success(res.data));
  yield put(getSeasons.fulfill());
}
function* getEpisodesData(action) {
  yield put(getEpisodes.request());
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
