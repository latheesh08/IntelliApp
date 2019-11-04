
//all create ticket functionaliyt to be added in this file
const {
    CREATE_TICKETING_FAILURE,
    CREATE_TICKETING_SUCCESS,
    CREATE_TICKETING_REQUEST,
} = require('../ActionTypes');

function createTicketingRequest(data) {
    return { type: CREATE_TICKETING_REQUEST, data };
}

function createTicketingFailure(error) {
    return { type: CREATE_TICKETING_FAILURE, error };
}

function createTicketingSuccess(data) {
    return { type: CREATE_TICKETING_SUCCESS, data };
}

function fetchCreateTicket(data, url, token) {
    return (dispatch) => {
        dispatch(createTicketingRequest());
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
               
            },
            body: JSON.stringify({
                issueSummary: data.title,
                issueDescription: data.description
            })
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch(createTicketingSuccess(response))
            }
            )
            .catch(error => dispatch(createTicketingFailure(error.data)));
    };
}

module.exports = fetchCreateTicket;