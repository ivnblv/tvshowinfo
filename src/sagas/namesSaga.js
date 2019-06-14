import { call, put, takeLatest } from "redux-saga/effects";
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
