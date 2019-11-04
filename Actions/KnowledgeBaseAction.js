//fetching knowledge base search result  
const {
  KNOWLEDGE_BASE_FAILURE,
  KNOWLEDGE_BASE_SUCCESS,
  KNOWLEDGE_BASE_REQUEST,
} = require('../ActionTypes');

function fetchKnowledgeBaseRequest(data) {
  return { type: KNOWLEDGE_BASE_REQUEST, data };
}

function fetchKnowledgeBaseFailure(error) {
  return { type: KNOWLEDGE_BASE_FAILURE, error };
}

function fetchKnowledgeBaseSuccess(data) {
  return { type: KNOWLEDGE_BASE_SUCCESS, data };
}
function fetchKnowledgeBaseRequesting() {
  return (dispatch) => {
    dispatch(fetchKnowledgeBaseRequest(false));
  }
}

function fetchKnowledgeBases(user, url) {
  var url = url.replace("emailId", user.email)
  return (dispatch) => {
    dispatch(fetchKnowledgeBaseRequest(true));
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response).includes("statusMessage")) {
          dispatch(fetchKnowledgeBaseFailure(response.statusMessage))
        }
        else {

          dispatch(fetchKnowledgeBaseSuccess(response))
        }
      })
      .catch(error => dispatch(fetchKnowledgeBaseFailure(error.statusMessage)));
  };
}

module.exports = { fetchKnowledgeBases, fetchKnowledgeBaseRequesting };