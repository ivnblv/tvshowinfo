import { all, fork } from "redux-saga/effects";
import * as schedule from "./scheduleSaga";
import * as show from "./showSaga";
import * as names from "./namesSaga";
import * as search from "./searchSaga";

function* rootSaga() {
  yield all(
    [
      ...Object.values(schedule),
      ...Object.values(show),
      ...Object.values(names),
      ...Object.values(search)
    ].map(fork)
  );
}

export default rootSaga;
