import { all, fork } from "redux-saga/effects";
import * as schedule from "./scheduleSaga";
import * as show from "./showSaga";
import * as names from "./namesSaga";
import * as search from "./searchSaga";

function* rootSaga() {
  // yield takeEvery(fetchSchedule.TRIGGER, fetchData);
  // yield takeLatest(fetchShow.TRIGGER, getShow);
  console.log([...Object.values(schedule)]);
  yield all(
    [
      ...Object.values(schedule),
      ...Object.values(show),
      ...Object.values(names),
      ...Object.values(search)
    ].map(fork)
  );
}

// function* fetchData(num){
//     try{
//         yield put(fetchSchedule.request());
//         console.log(num);
//         yield put(fetchSchedule.success());
//         console.log('successs');

//         yield put(fetchSchedule.fulfill());

//         console.log('ful');
//     }
//     catch(e){
//         console.log(e);
//     }
// }

// function* getCast(id){

// }
// function* getSeasons(id){

// }
// function* getName(id){

// }

// export const getShow = (id) => async dispatch =>{
//     dispatch({
//         type: GET_SHOW_REQUEST
//     })
//     const res = await axios.get(`http://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`);
//     console.log('res');
//     dispatch({
//         type: GET_SHOW_SUCCESS,
//         payload: res.data
//     })
//     // setTimeout(() => {
//     //     dispatch({
//     //         type: GET_SHOW_SUCCESS,
//     //         payload: res.data
//     //     })
//     // }, 10000);
// };

export default rootSaga;
