import { all, fork } from "redux-saga/effects";
import InvestmentSaga from "./Investment/InvSaga";
import UserWatcher from "./User/UserSaga";
import SettingWatcher from "./Settings/SettingSaga";

export default function* rootSaga() {
    yield all([fork(UserWatcher)]);
    yield all([fork(InvestmentSaga)]);
    yield all([fork(SettingWatcher)]);
}