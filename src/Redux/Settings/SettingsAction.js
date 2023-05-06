import { GLOBAL_SETTING_REQ , GLOBAL_SETTING, NESTED_SETTING_REQ, NESTED_SETTING_LIST, ADD_NESTED_SETTING } from "../types";

export const globalSettingReq = () => {
    return{
        type: GLOBAL_SETTING_REQ
    }
}

export const globalSettingMain = (data) => {
    return{
        type: GLOBAL_SETTING,
        payload: data
    }
}

export const nestedSettingAdd = (settingData) => {
    return{
        type: ADD_NESTED_SETTING,
        payload: settingData
    }
}

export const nestedSettingReq = (id) => {
    return{
        type: NESTED_SETTING_REQ,
        payload: id
    }
}

export const nestedSettingList = (data) => {
    return{
        type: NESTED_SETTING_LIST,
        payload: data
    }
}