import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Action from '../types'
import { allInvestmentList, getAllInvestment } from './invAction';
import getAPI from '../../Constant';

function* addNewInvestment (data) {
    const invSave = yield axios.post(`${getAPI()}investment/add`, data.payload, {
        headers: {
            authentication: localStorage.getItem('token')
        }
    })
    .then((res) => {
        var response = res.data
        console.log("res", res);
        return response;
    })
    .catch((err) => {
        var errMsg = err.message;
        console.log("errMsg", errMsg);
        return errMsg;
    })
    if(invSave){
        console.log("invSave", invSave);
        if(invSave.status){
            yield put(getAllInvestment())
        }
    }
}

function* getAllInvestList () {
    const investRequest = yield axios.get(`${getAPI()}investment/list-all`, {
        headers: {
            authentication: localStorage.getItem('token')
        }
    })
    .then((res) => {
        var response = res.data
        console.log("res", res);
        return response;
    })
    .catch((err) => {
        var errMsg = err.message;
        console.log("errMsg", errMsg);
        return errMsg;
    })
    if(investRequest){
        yield put(allInvestmentList(investRequest))
        // console.log("invReq", invReq);
    }
}

export function* InvestmentSaga(){
    yield takeEvery(Action.ADD_NEW_INVESTMENT, addNewInvestment)
    yield takeEvery(Action.GET_ALL_INVESTMENT_REQ, getAllInvestList)
}
export default function* rootSaga(){
    yield all([fork(InvestmentSaga)])
}