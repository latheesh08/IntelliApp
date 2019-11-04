const { TICKETING_REQUEST, TICKETING_SUCCESS, TICKETING_FAILURE , TICKETING_UPDATE } = require('../ActionTypes');

const initialState = {
  loading: false,
  initialLoad: true,
  results: [],
  responseStatus: null,
};

function ticketingReducer(state = initialState, action) {
  switch (action.type) {
  case TICKETING_REQUEST:
    return { ...state,
      loading: true,
      initialLoad: true,
    };
  case TICKETING_SUCCESS:
    return {
      ...state,
      loading: false,
      initialLoad: false,
      results: action.data.row,
      responseStatus: action.data.res.responseStatus,
    };
  case TICKETING_FAILURE:
    return {
      ...state,
      loading: false,
      initialLoad: false,
      results: [],
      responseStatus: { ...action.error },
    };
  case TICKETING_UPDATE:
    return {
      ...state,
      results: action.data.row
    }
  default:
    return state;
  }
}

export default ticketingReducer;
