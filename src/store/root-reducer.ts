import { combineReducers } from "redux";
import graphReducer from "./graph-saga/graph-saga-reducer";
import infoReducer from "./info-saga/info-reducer";

const reducer = combineReducers({ info: infoReducer, graphData: graphReducer});

export default reducer;