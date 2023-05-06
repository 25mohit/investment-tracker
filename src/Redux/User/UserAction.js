import { LOGIN_USER_REQ, LOGIN_USER_RESPONSE, GET_ACCOUNT_ACTIVITY, ACCOUNT_ACTIVITY, LOGOUT_ACTIVITY } from "../types";

export const loginUserReq = (loginData) => {
    return{
        type: LOGIN_USER_REQ,
        payload: loginData
    }
}

export const loginUserRes = (loginRes) => {
    return{
        type: LOGIN_USER_RESPONSE,
        payload: loginRes
    }
}

export const activityReq = () => {
    return{
        type: ACCOUNT_ACTIVITY
    }
}

export const activitylist = (data) => {
    return{
        type: GET_ACCOUNT_ACTIVITY,
        payload: data
    }
}

export const logoutActivity = () => {
    return{
        type: LOGOUT_ACTIVITY
    }
}
