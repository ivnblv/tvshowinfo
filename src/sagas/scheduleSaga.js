import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getSchedule } from "../routines";
import { fetchData } from "../api";

export function* scheduleSaga() {
  yield takeLatest(getSchedule.TRIGGER, getScheduleData);
}

function* getScheduleData(action) {
  // try{
  //     yield put(getSchedule.request());
  //     console.log(action)
  //     yield put(getSchedule.success());

  //     yield put(getSchedule.fulfill());

  // }
  // catch(e){
  //     console.log(e);
  // }
  yield put(getSchedule.request());
  console.log(action.payload);
  const res = yield call(fetchData, action.payload);
  yield put(getSchedule.success(res.data));
  yield put(getSchedule.fulfill());
}
