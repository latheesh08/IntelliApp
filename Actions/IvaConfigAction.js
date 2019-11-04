
//all IVA url fecth requests in this module
const { IVA_REQUEST,
    IVA_SUCCESS,
    IVA_FAILURE, Login_Details } = require('../ActionTypes');
import jwt from 'jwt-decode'
function fetchIvaRequest(data) {
    return { type: IVA_REQUEST, data };
}

function fetchIvaFailure(error) {
    return { type: IVA_FAILURE, error };
}

function fetchIvaSuccess(data) {
    return { type: IVA_SUCCESS, data };
}
function logindetails(user) {
    return { type: Login_Details, user };
}

function fetchIva(user, url) {
    return (dispatch) => {
        dispatch(fetchIvaRequest());
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((response) => {
                response = JSON.stringify(response)
                var res = JSON.parse(response)
                if ("userID" in res) {
                    var decoded = jwt(user.idToken);
                    user.email = decoded[res.userID]
                    response = response.replace(/\${email}/g, `${decoded[res.userID]}`).replace(/\${lastName}/g, `${user.lastname}`).replace(/\${firstName}/g, `${user.firstname}`).replace(/\${idToken}/g, `${user.idToken}`)
                }
                else {
                    response = response.replace(/\${email}/g, `${user.email}`).replace(/\${lastName}/g, `${user.lastname}`).replace(/\${firstName}/g, `${user.firstname}`)
                }
                response = JSON.parse(response)
                dispatch(logindetails(user))
                dispatch(fetchIvaSuccess(response))
            }
            )
            .catch(error => dispatch(fetchIvaFailure(error.data)));
    };
}

module.exports = fetchIva;