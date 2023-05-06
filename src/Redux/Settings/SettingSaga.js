import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Action from '../types'
import { globalSettingMain, nestedSettingList } from './SettingsAction';

function* mainSetting(){
    const getMainSetting = yield axios.get('http://localhost:6767/global-settings/get')
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
    if(getMainSetting){
        console.log(getMainSetting);
        yield put(globalSettingMain(getMainSetting))
    }
}

function* nestedSettingSaga(id){
    const nestSetting = yield axios.get(`http://localhost:6767/global-settings/detail/get-all/${id.payload}`,{
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
    if(nestSetting){
        console.log("nestSetting-1", nestSetting);
        yield put(nestedSettingList(nestSetting))
    }
}

function* addNestedSetting(data){
    const nestSetting = yield axios.post(`http://localhost:6767/global-settings/detail/${data.payload.id}`, data.payload.data,{
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
    if(nestSetting){
        console.log("nestSetting-2", nestSetting);
        // yield put(nestedSettingList(nestSetting))
    }
}

export function* SettingWatcher(){
    yield takeEvery(Action.GLOBAL_SETTING_REQ, mainSetting)
    yield takeEvery(Action.NESTED_SETTING_REQ, nestedSettingSaga)
    yield takeEvery(Action.ADD_NESTED_SETTING, addNestedSetting)
}
export default function* rootSaga(){
    yield all([fork(SettingWatcher)])
}