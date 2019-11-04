//  basic url configuration and fetch tenant based on email domain 
const { BASICCONFIG_SUCCESS,} = require('../ActionTypes');
var url = require('../Config/ConfigUrl').url
function basicConfigSuccess(tenant, urlVal) {
    return { type: BASICCONFIG_SUCCESS, obj: { tenant, urlVal: urlVal, } };
}
function basicConfig(data) {
    var urlVal = {}
    return (dispatch) => {
        return fetch(url.baseUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => resp.json())
            .then((resp) => {
                urlVal = JSON.stringify(url.url)
                urlVal = urlVal.replace(/configURL/g, resp.configURL).replace(/restApiURL/g, resp.restApiURL)
                urlVal = JSON.parse(urlVal)
                return fetch(urlVal.DomainUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => res.json())
                    .then((res) => {
                        var tenant = ""
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].domain.toLowerCase() == data.toLowerCase()) {
                                tenant = res[i].tenantId
                            }
                        }
                        if (url.demo == true || tenant == "servion") {
                            tenant = "demo"
                        }

                        urlVal = JSON.stringify(urlVal)
                        urlVal = urlVal.replace(/tenant/g, tenant)
                        urlVal = JSON.parse(urlVal)
                        dispatch(basicConfigSuccess(tenant, urlVal))
                    })
                    .catch(error => console.log(error));
            })
    }
}






module.exports = basicConfig
