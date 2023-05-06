import { ADD_NEW_INVESTMENT, GET_ALL_INVESTMENT_REQ, ALL_INVESTMENT_LIST } from '../types'

export const addInvestment = (data) => {
    return{
        type : ADD_NEW_INVESTMENT,
        payload: data
    }
}

export const getAllInvestment = () => {
    return{
        type : GET_ALL_INVESTMENT_REQ
    }
}

export const allInvestmentList = (investList) => {
    return{
        type : ALL_INVESTMENT_LIST,
        payload: investList
    }
}