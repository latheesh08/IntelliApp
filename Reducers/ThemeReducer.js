const { STYLE_REQUEST,
    STYLE_SUCCESS,BASICCONFIG_SUCCESS,
    STYLE_FAILURE } = require('../ActionTypes');

const intialstate = {
    style: {},
    status: 'loading',
    tenant: "",
    url: {},
    sso: {}
}

function themereducer(state = intialstate, action) {
    switch (action.type) {
        case STYLE_REQUEST:
            return {
                ...state,
                status: 'loading',

            };
        case STYLE_SUCCESS:
            return {
                ...state,
                status: 'success',
                style: action.obj.data,
                tenant: action.obj.tenant,
                url: action.obj.urlVal,
                sso: action.obj.sso,

            };
        case BASICCONFIG_SUCCESS:
            return {
                ...state,
                status: 'loading',
                tenant: action.obj.tenant,
                url: action.obj.urlVal,
            };
        case STYLE_FAILURE:
            return {
                ...state,
                status: action.error,
                style: {},
                sso: {}
            };
        default:
            return state;

    }
}

export default themereducer;