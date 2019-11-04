const { OUTAGES_REQUEST, OUTAGES_SUCCESS, OUTAGES_FAILURE } = require('../ActionTypes');

const initialState = {
  loading: false,
  initialLoad: true,
  endDate: '',
  results: [],
  responseStatus: null,
};

function outagesReducer(state = initialState, action) {
  switch (action.type) {
  case OUTAGES_REQUEST:
    return { ...state,
      loading: true,
    };
  case OUTAGES_SUCCESS:
    return {
      ...state,
      loading: false,
      initialLoad: false,
      results: action.data.result.sort(function(a,b) {return (a.begin < b.begin) ? 1 : ((b.begin < a.begin) ? -1 : 0);}),
      responseStatus: action.data.responseStatus,
    };
  case OUTAGES_FAILURE:
    return {
      ...state,
      loading: false,
      results: [],
      responseStatus: { ...action.error },
    };
  default:
    return state;
  }
}

export default outagesReducer;
