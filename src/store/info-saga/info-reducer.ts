import { DataType, SeverityType } from "../../components/common-types/common-types";
import { GET_INFO_SAGA, SET_INFO_SAGA, SET_INFO_SAGA_ERROR, SET_INFO_SAGA_LOADING } from "./info-types";


export interface TableIState {
    loading: boolean;
    data: null  | any
    infoError: boolean
}

const initialState: TableIState = {
    loading: false,
    data:  null,
    infoError: false
}

export interface TableAction {
    type: String;
    payload: {
        page?: number,
        count?: number,
        startDate?: string,
        endDate?: string
        filterBySeverity?: SeverityType
    }
}

const infoReducer = (state = initialState, action: TableAction): TableIState => {
    switch (action.type) {
        case SET_INFO_SAGA_LOADING: 
            return {
                loading: true,
                data:  null,
                infoError: false
            }
        case SET_INFO_SAGA:
            return {
                ...state,
                data: action.payload,
                loading: false,
                infoError: false
            }
        case SET_INFO_SAGA_ERROR:
            return {
                loading: false,
                data:  null,
                infoError: true
            }
        default:
            return state;
    }
}

export default infoReducer