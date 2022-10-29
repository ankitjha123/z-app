import { GET_GRAPH_SAGA, SET_GRAPH_SAGA, SET_GRAPH_SAGA_ERROR, SET_GRAPH_SAGA_LOADING } from "./graph-saga-types";

interface GraphIState {
    loading: boolean;
    data: null | Record<string, number>[];
    graphError: boolean
}

const initialState: GraphIState = {
    loading: false,
    data: null,
    graphError: false
}

export interface GraphAction {
    type: string;
    payload: any
}

const graphReducer = (state = initialState, action: GraphAction) => {
    switch (action.type) {
        case SET_GRAPH_SAGA_LOADING: 
            return {
                loading: true,
                data: null,
                graphError: false
            }
        case SET_GRAPH_SAGA:
            return {
                ...state,
                data: action.payload,
                loading: false,
                graphError: false
            }
        case SET_GRAPH_SAGA_ERROR: 
            return {
                loading: false,
                data: null,
                graphError: true
            }
        default:
            return state;
    }
}

export default graphReducer;