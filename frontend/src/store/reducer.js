import {FETCH_DATES} from "../actions/types"
const initialState = {
  dates:[],
  newDate: {}
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_DATES:
      return {
        ...state,
        dates: action.payload,
    }
    default:
      return state;
  }
};

export default reducer;
