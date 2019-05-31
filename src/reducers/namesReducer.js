import { getPerson, getCastCredits, getCrewCredits } from "../routines";

const initialState = {
  castCredits: [],
  person: {},
  crewCredits: [],
  fetchingPerson: false,
  fetchingCast: false,
  fetchingCrew: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case getPerson.TRIGGER:
      return {
        ...state,
        fetchingPerson: true
      };
    case getPerson.SUCCESS:
      return {
        ...state,
        person: action.payload
      };
    case getPerson.FULFILL:
      return {
        ...state,
        fetchingPerson: false
      };
    case getCastCredits.TRIGGER:
      return {
        ...state,
        fetchingCast: true
      };
    case getCastCredits.SUCCESS:
      return {
        ...state,
        castCredits: action.payload
      };
    case getCastCredits.FULFILL:
      return {
        ...state,
        fetchingCast: false
      };

    case getCrewCredits.TRIGGER:
      return {
        ...state,
        fetchingCrew: true
      };
    case getCrewCredits.SUCCESS:
      return {
        ...state,
        crewCredits: action.payload
      };
    case getCrewCredits.FULFILL:
      return {
        ...state,
        fetchingCrew: false
      };
    default:
      return state;
  }
}
