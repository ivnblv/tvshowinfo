import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getPerson, getCastCredits, getCrewCredits } from "../routines";
import { fetchData } from "../api";

export function* namesSaga() {
  yield takeLatest(getPerson.TRIGGER, getPersonData);
  yield takeLatest(getCastCredits.TRIGGER, getCastData);
  yield takeLatest(getCrewCredits.TRIGGER, getCrewData);
}

function* getPersonData(action) {
  yield put(getPerson.request());
  const res = yield call(fetchData, action.payload);
  yield put(getPerson.success(res.data));
  yield put(getPerson.fulfill());
}
function* getCastData(action) {
  yield put(getCastCredits.request());
  const res = yield call(fetchData, action.payload);
  yield put(getCastCredits.success(res.data));
  yield put(getCastCredits.fulfill());
}
function* getCrewData(action) {
  yield put(getCrewCredits.request());
  const res = yield call(fetchData, action.payload);
  yield put(getCrewCredits.success(res.data));
  yield put(getCrewCredits.fulfill());
}

// yield put(getCastCrew.request());
//   const res = yield call(fetchData, action.payload);
//   yield put(getCastCrew.success(res.data));

//   yield put(getCastCrew.fulfill());

// export function* showSaga(){
//     yield takeLatest(getShow.TRIGGER, getShowData);
//     yield takeLatest(getSeasons.TRIGGER, getSeasonsData);
//     yield takeLatest(getEpisodes.TRIGGER, getEpisodesData);
// }

// function* getShowData(action){
//     yield put(getShow.request());
//     console.log(action.payload);
//     const res = yield call(fetchData, action.payload);
//     yield put(getShow.success(res.data));
//     yield put(getShow.fulfill());
// }
// function* getSeasonsData(action){
//     yield put(getSeasons.request());
//     console.log(action.payload);
//     const res = yield call(fetchData, action.payload);
//     yield put(getSeasons.success(res.data));
//     yield put(getSeasons.fulfill());
// }
// function* getEpisodesData(action){
//     yield put(getEpisodes.request());
//     console.log(action.payload);
//     const res = yield call(fetchData, action.payload);
//     yield put(getEpisodes.success(res.data));
//     yield put(getEpisodes.fulfill());
// }
