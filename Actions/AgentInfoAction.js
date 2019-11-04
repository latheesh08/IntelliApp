//call agent info fetching and move to reducer 
const { CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_FAILURE } = require('../ActionTypes');
function fetchAgentInfoRequest(data) {
    return { type: CONTACT_REQUEST, data };
}

function fetchAgentInfoFailure(error) {
    return { type: CONTACT_FAILURE, error };
}

function fetchAgentInfoSuccess(data) {
    return { type: CONTACT_SUCCESS, data };
}

// data for getting agent contact
function fetchAgentInfo(url, token) {
    return (dispatch) => {
        dispatch(fetchAgentInfoRequest());
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
                dispatch(fetchAgentInfoSuccess(response))
            }
            )
            .catch(error => dispatch(fetchAgentInfoFailure(error.data)));
    };
}

module.exports = fetchAgentInfo;