import { LOGIN_USER_REQ, LOGIN_USER_RESPONSE, GET_ACCOUNT_ACTIVITY, ACCOUNT_ACTIVITY, LOGOUT_ACTIVITY  } from "../types"

const initalState = {
    loginData: {},
    loginRes: '',
    activity: []
}

const userReducer = (state = initalState, action) => {
    switch(action.type){
        case LOGIN_USER_REQ:
        return {
            ...state,
            loginData: action.payload
        }
        case LOGIN_USER_RESPONSE:
        return {
            ...state,
            loginRes: action.payload
        }
        case ACCOUNT_ACTIVITY:
        return {
            ...state
        }
        case GET_ACCOUNT_ACTIVITY:
        return {
            ...state,
            activity: action.payload
        }
        case LOGOUT_ACTIVITY:
        return {
            ...state
        }
        default:
            return state
    }
}

export default userReducer