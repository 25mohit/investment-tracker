import { GLOBAL_SETTING_REQ, GLOBAL_SETTING, NESTED_SETTING_REQ, NESTED_SETTING_LIST, ADD_NESTED_SETTING } from "../types";

const initialState = {
    mainSetting: {},
    nestedSetting: [],
    addData: {},
}

const SettingReducer = (state = initialState, action) =>{
    switch(action.type){
        case GLOBAL_SETTING_REQ:
            return{
                ...state
            }
        case GLOBAL_SETTING:
            return{
                ...state,
            mainSetting: action.payload
            }
        case NESTED_SETTING_REQ:
            return{
                ...state
            }
        case NESTED_SETTING_LIST:
            return{
                ...state,
                nestedSetting: action.payload
            }
        case ADD_NESTED_SETTING:
            return{
                ...state,
                addData: action.payload
            }
        default:
            return state
    }
}
export default SettingReducer