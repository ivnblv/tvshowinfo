import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { fetchData } from "../api";
import * as routines from "../routines";

const {
  getSchedule,
  searchShows,
  searchNames,
  liveSearch,
  clearSearch,
  getShow,
  getSeasons,
  getEpisodes,
  getCastCrew,
  getPerson,
  getCastCredits,
  getCrewCredits
} = routines;

export function* dataSaga() {
  //SCHEDULE
  yield takeLatest(getSchedule.TRIGGER, getData, getSchedule);

  // SEARCH
  yield takeLatest(searchShows.TRIGGER, getData, searchShows);
  yield takeLatest(searchNames.TRIGGER, getData, searchNames);
  yield takeEvery(liveSearch.TRIGGER, getData, liveSearch);
  yield takeLatest(clearSearch.TRIGGER, searchClear);

  // SHOWS
  yield takeEvery(getShow.TRIGGER, getData, getShow);
  yield takeEvery(getSeasons.TRIGGER, getData, getSeasons);
  yield takeEvery(getEpisodes.TRIGGER, getData, getEpisodes);
  yield takeEvery(getCastCrew.TRIGGER, getData, getCastCrew);

  // NAMES
  yield takeLatest(getPerson.TRIGGER, getData, getPerson);
  yield takeLatest(getCastCredits.TRIGGER, getData, getCastCredits);
  yield takeLatest(getCrewCredits.TRIGGER, getData, getCrewCredits);
}

function* searchClear(action) {
  yield put(routines.clearSearch.fulfill(action.payload));
}

function* getData(type, action) {
  yield put(type.request());
  try {
    const res = yield call(fetchData, action.payload);
    yield put(type.success(res.data));
  } catch (error) {
    console.log(error);
    yield put(type.failure());
    window.location = "/404";
  }
  yield put(type.fulfill());
}
