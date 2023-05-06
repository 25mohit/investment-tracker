import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Action from '../types'
import { activitylist, loginUserRes } from './UserAction';
import getAPI from '../../Constant';

function* loginUserSaga(loginData){
    const loginUser = yield axios.post(`${getAPI()}user/login`, loginData.payload)
    .then((res) => {
        var response = res.data
        console.log("res", res, response);
        return response;
    })
    .catch((err) => {
        var errMsg = err.response.data;
        console.log("errMsg", err.response.data);
        return errMsg;
    })
    if(loginUser){
        yield put(loginUserRes(loginUser))
        if(loginUser.status){
            localStorage.setItem('invest', loginUser.investments.invested )
            localStorage.setItem('sold', loginUser.investments.sold)
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('user_name', loginUser.user)
            localStorage.setItem('token', loginUser.token)
        }
        console.log("loginUser", loginUser);
    }
}

function* accountActivitySaga(){
    const activity = yield axios.get(`${getAPI()}activity`, {
        headers: {
            authentication: localStorage.getItem('token')
        }
    })
    .then((res) => {
        var response = res.data
        console.log("res", res, response);
        return response;
    })
    .catch((err) => {
        var errMsg = err.response.data;
        console.log("errMsg", err.response.data);
        return errMsg;
    })
    if(activity){
        yield put(activitylist(activity))
        console.log("activity", activity);
    }
}

function* logoutActivitySaga(){
    const logoutActivity = yield axios.post(`${getAPI()}activity/update`,{}, {
        headers: {
            authentication: localStorage.getItem('token')
        }
    })
    .then((res) => {
        var response = res.data
        console.log("res1", res, response);
        return response;
    })
    .catch((err) => {
        var errMsg = err.response.data;
        console.log("errMsg1", err.response.data);
        return errMsg;
    })
    if(logoutActivity){
        console.log("logoutActivity1", logoutActivity);
    }
}

export function* UserWatcher(){
    yield takeEvery(Action.LOGIN_USER_REQ, loginUserSaga)
    yield takeEvery(Action.ACCOUNT_ACTIVITY, accountActivitySaga)
    yield takeEvery(Action.LOGOUT_ACTIVITY, logoutActivitySaga)
}
export default function* rootSaga(){
    yield all([fork(UserWatcher)])
}