import { getShow, getSeasons, getEpisodes, getCastCrew } from "../routines";

const initialState = {
  seasons: {},
  cast: {},
  episodes: [],
  data: {},
  fetchingShow: false,
  fetchingEpisodes: false,
  fetchingCast: false,
  fetchingSeasons: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case getShow.TRIGGER:
      return {
        ...state,
        fetchingShow: true
      };
    case getShow.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case getShow.FULFILL:
      return {
        ...state,
        fetchingShow: false
      };

    case getSeasons.TRIGGER:
      return {
        ...state,
        fetchingSeasons: true
      };
    case getSeasons.SUCCESS:
      return {
        ...state,
        seasons: action.payload
      };
    case getSeasons.FULFILL:
      return {
        ...state,
        fetchingSeasons: false
      };

    case getEpisodes.TRIGGER:
      return {
        ...state,
        fetchingEpisodes: true
      };
    case getEpisodes.SUCCESS:
      return {
        ...state,
        episodes: action.payload
      };
    case getEpisodes.FULFILL:
      return {
        ...state,
        fetchingEpisodes: false
      };

    case getCastCrew.TRIGGER:
      return {
        ...state,
        fetchingCast: true
      };
    case getCastCrew.SUCCESS:
      return {
        ...state,
        cast: action.payload
      };
    case getCastCrew.FULFILL:
      return {
        ...state,
        fetchingCast: false
      };
    default:
      return state;
  }
}
