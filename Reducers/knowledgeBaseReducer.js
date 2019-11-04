const { KNOWLEDGE_BASE_REQUEST, KNOWLEDGE_BASE_SUCCESS, KNOWLEDGE_BASE_FAILURE } = require('../ActionTypes');

const initialState = {
  loading: false,
  results: [],
  responseStatus: '',
};

function knowledgeBaseReducer(state = initialState, action) {
  switch (action.type) {
    case KNOWLEDGE_BASE_REQUEST:
      return {
        ...state,
        responseStatus: '',
        results: [],
        loading: action.data,
      };
    case KNOWLEDGE_BASE_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.data.result,
        responseStatus: action.data.responseStatus,
      };
    case KNOWLEDGE_BASE_FAILURE:
      return {
        ...state,
        loading: false,
        results: [],
        responseStatus: action.error,
      };
    default:
      return state;
  }
}

export default knowledgeBaseReducer;
