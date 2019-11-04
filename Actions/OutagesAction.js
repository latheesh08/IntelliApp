//fetching Outage data
const {
  OUTAGES_FAILURE,
  OUTAGES_SUCCESS,
  OUTAGES_REQUEST,
} = require('../ActionTypes');

function fetchOutagesRequest(data) {
  return { type: OUTAGES_REQUEST, data };
}

function fetchOutagesFailure(error) {
  return { type: OUTAGES_FAILURE, error };
}

function fetchOutagesSuccess(data) {
  return { type: OUTAGES_SUCCESS, data };
}

function fetchOutages(url, token) {
  return (dispatch) => {
    dispatch(fetchOutagesRequest());
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(fetchOutagesSuccess(response))
      })
      .catch(error => dispatch(fetchOutagesFailure(error)));
  };
}

module.exports = fetchOutages;