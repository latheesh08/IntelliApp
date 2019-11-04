const { CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_FAILURE } = require('../ActionTypes');

const intialstate = {
    result: [],
    status: ''
}

function contactReducer(state = intialstate, action) {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                status: 'loading',

            };
        case CONTACT_SUCCESS:
            return {
                ...state,
                status: 'success',
                result: action.data.phonenumbers 
            };
        case CONTACT_FAILURE:
            return {
                ...state,
                result: [],
                status: 'failure'
            };
            default:
                    return state;

    }
}

export default contactReducer;