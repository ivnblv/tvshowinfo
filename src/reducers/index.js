import { combineReducers } from "redux";
import showReducer from "./showReducer";
import scheduleReducer from "./scheduleReducer";
import namesReducer from "./namesReducer";
import searchReducer from "./searchReducer";
import searchbarReducer from "./searchbarReducer";

export default combineReducers({
  schedule: scheduleReducer,
  show: showReducer,
  people: namesReducer,
  search: searchReducer,
  searchbar: searchbarReducer
});
