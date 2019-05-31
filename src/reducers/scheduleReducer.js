import { getSchedule } from "../routines";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case getSchedule.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case getSchedule.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case getSchedule.FULFILL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
