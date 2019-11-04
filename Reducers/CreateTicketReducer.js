const {
    CREATE_TICKETING_FAILURE,
    CREATE_TICKETING_SUCCESS,
    CREATE_TICKETING_REQUEST,
} = require('../ActionTypes');

const intialstate = {
    record: {},
    status: ''
}

function createTicketreducer(state = intialstate, action) {
    switch (action.type) {
        case CREATE_TICKETING_REQUEST:
            return {
                ...state,
                status: 'loading',

            };
        case CREATE_TICKETING_SUCCESS:
            return {
                ...state,
                status: 'success',
                record: { ...action.data }
            };
        case CREATE_TICKETING_FAILURE:
            return {
                ...state,
                status: 'failure'
            };
        default:
            return state;

    }
}

export default createTicketreducer;