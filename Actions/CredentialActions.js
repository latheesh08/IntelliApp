//set the login credentials details

const { Login_Details } = require('../ActionTypes')


function logindetails(user) {
    return { type: Login_Details, user };
}
module.exports = {
    logindetails
}