//fetching theme and authentication  details  based on tenant 
const { STYLE_REQUEST,
    STYLE_SUCCESS,
    STYLE_FAILURE } = require('../ActionTypes');
var url = require('../Config/ConfigUrl').url
import { strings } from '../i18n/TranslationsConfig';
function fetchStyleRequest(data) {
    return { type: STYLE_REQUEST, data };
}

function fetchStyleFailure(error) {
    return { type: STYLE_FAILURE, error };
}

function fetchStyleSuccess(data, tenant, urlVal, sso) {
    return { type: STYLE_SUCCESS, obj: { data, tenant, urlVal, sso } };
}
function fetchStyle(data) {
    return (dispatch) => {
        dispatch(fetchStyleRequest());
        if (url.demo == true || data.tenant == "demo") {
            return fetch(data.url.themeUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((response) => dispatch(fetchStyleSuccess(response, data.tenant, data.url, "")))
                .catch(error => dispatch(fetchStyleFailure(error.data)));
        }
        else {
            if (data.tenant == "demo") {
                fetchStyleFailure("Invalid Email")
            }
            else {
                return fetch(data.url.authenticationUrl
                    // `https://inteliapprestdev.unisys.com/${tenant}/configuration/authentication?tenantId=${tenant}`
                    , {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    .then((resp) => resp.json())
                    .then((resp) => {
                        return fetch(data.url.themeUrl, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            }
                        })
                            .then((response) => response.json())
                            .then((response) => {
                                dispatch(fetchStyleSuccess(response, data.tenant, data.url, resp))
                            })
                            .catch(error => dispatch(fetchStyleFailure(strings.login.notenant[0])));
                    })
            }

        }
    }
}



module.exports = fetchStyle