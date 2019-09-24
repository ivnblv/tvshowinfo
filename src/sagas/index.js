import { dataSaga } from "./dataSaga";

function* rootSaga() {
  yield dataSaga();
}

export default rootSaga;
