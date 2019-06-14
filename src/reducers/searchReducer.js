import { searchShows, searchNames } from "../routines";

const initialState = {
  shows: [],
  names: [],
  fetchingShows: false,
  fetchingNames: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case searchShows.TRIGGER:
      return {
        ...state,
        fetchingShows: true
      };
    case searchShows.SUCCESS:
      return {
        ...state,
        shows: action.payload
      };
    case searchShows.FULFILL:
      return {
        ...state,
        fetchingShows: false
      };

    case searchNames.TRIGGER:
      return {
        ...state,
        fetchingNames: true
      };
    case searchNames.SUCCESS:
      return {
        ...state,
        names: action.payload
      };
    case searchNames.FULFILL:
      return {
        ...state,
        fetchingNames: false
      };

    default:
      return state;
  }
}
