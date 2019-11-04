const { IVA_REQUEST,
    IVA_SUCCESS,
    IVA_FAILURE } = require('../ActionTypes');

const intialstate = {
    iva: {},
    status: ''
}

function ivareducer(state = intialstate, action) {
    switch (action.type) {
        case IVA_REQUEST:
            return {
                ...state,
                status: 'loading',

            };
        case IVA_SUCCESS:
            return {
                ...state,
                status: 'success',
                iva: action.data
            };
        case IVA_FAILURE:
            return {
                ...state,
                status: 'failure'
            };
            default:
                    return state;

    }
}

export default ivareducer;