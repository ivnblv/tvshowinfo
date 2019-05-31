import {
  liveSearchNames,
  liveSearchShows,
  liveSearch,
  clearSearch
} from "../routines";

const initialState = {
  shows: [],
  names: [],
  fetchingShows: false,
  fetchingNames: false,
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
    case liveSearchShows.TRIGGER:
      return {
        ...state,
        fetchingShows: true
      };
    case liveSearchShows.SUCCESS:
      return {
        ...state,
        shows: action.payload
      };
    case liveSearchShows.FULFILL:
      return {
        ...state,
        fetchingShows: false
      };

    case liveSearchNames.TRIGGER:
      return {
        ...state,
        fetchingNames: true
      };
    case liveSearchNames.SUCCESS:
      return {
        ...state,
        names: action.payload
      };
    case liveSearchNames.FULFILL:
      return {
        ...state,
        fetchingShows: false
      };

    default:
      return state;
  }
}
