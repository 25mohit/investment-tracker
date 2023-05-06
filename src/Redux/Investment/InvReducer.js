import { ADD_NEW_INVESTMENT, ALL_INVESTMENT_LIST, GET_ALL_INVESTMENT_REQ } from "../types";

const initialState = {
    investData: {},
    investList: []
}

const InvestmentReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_NEW_INVESTMENT:
            return{
                ...state,
                investData: action.payload
            }

        case GET_ALL_INVESTMENT_REQ:
            return{
                ...state
            }
            
        case ALL_INVESTMENT_LIST:
            return{
                ...state,
                investList: action.payload
            }
            default :
            return state
    }
}

export default InvestmentReducer