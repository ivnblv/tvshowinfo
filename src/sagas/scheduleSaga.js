import { call, put, takeLatest } from "redux-saga/effects";
import { getSchedule } from "../routines";
import { fetchData } from "../api";

export function* scheduleSaga() {
  yield takeLatest(getSchedule.TRIGGER, getScheduleData);
}

function* getScheduleData(action) {
  yield put(getSchedule.request());
  const res = yield call(fetchData, action.payload);
  yield put(getSchedule.success(res.data));
  yield put(getSchedule.fulfill());
}
