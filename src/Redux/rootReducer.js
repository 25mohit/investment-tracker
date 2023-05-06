import { combineReducers } from "redux";
import InvestmentReducer from "./Investment/InvReducer";
import userReducer from "./User/UserReducer";
import SettingReducer from "./Settings/SettingsReducer";

const rootReducer = combineReducers({
    user: userReducer,
    investment: InvestmentReducer,
    settings: SettingReducer
})

export default rootReducer