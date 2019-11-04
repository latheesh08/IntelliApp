const { Login_Details } = require('../ActionTypes')

const intialState = {
    user: {},
}

function credentialsReducer (state = intialState, action) {
    switch(action.type){
        case Login_Details:
            return {
                ...state,
                user: { ...action.user },
            }
        default : return state
    }
}


export default credentialsReducer