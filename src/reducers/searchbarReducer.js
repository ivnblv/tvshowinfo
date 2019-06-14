import { liveSearch, clearSearch } from "../routines";

const initialState = {
  searchbarFetching: false,
  result: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case clearSearch.FULFILL:
      return {
        ...state,
        result: action.payload
      };
    case liveSearch.TRIGGER:
      return {
        ...state,
        searchbarFetching: true
      };
    case liveSearch.SUCCESS:
      return {
        ...state,
        result: [...state.result, ...action.payload]
      };
    case liveSearch.FULFILL:
      return {
        ...state,
        searchbarFetching: false
      };

    default:
      return state;
  }
}
