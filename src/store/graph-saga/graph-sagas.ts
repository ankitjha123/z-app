import { all, call, put, takeLatest } from "redux-saga/effects";
import { GraphAction } from "./graph-saga-reducer";
import { GET_GRAPH_SAGA, SET_GRAPH_SAGA, SET_GRAPH_SAGA_ERROR, SET_GRAPH_SAGA_LOADING } from "./graph-saga-types";


export interface GraphDataType {
    dateCount: Record<string,number>[]
}

function fetchCallFn(payload: any) {
    return fetch('http://localhost:8080/getCountBydate', {
        method: "POST",
        headers: {
           "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload),
    })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

function* getGraphData({type, payload}: GraphAction) {
    yield put({type: SET_GRAPH_SAGA_LOADING})
    const {response, error} = yield call(fetchCallFn, payload);
    let data: GraphDataType = yield response.json() 
    if(error) {
        yield put({type: SET_GRAPH_SAGA_ERROR})
    } else {
        yield put({type: SET_GRAPH_SAGA, payload: data})
    }
}

function* watchGraphDataSaga() {
    yield takeLatest(GET_GRAPH_SAGA, getGraphData)
}

function* graphSagas() {
    yield all([
        call(watchGraphDataSaga)
    ])
}

export default graphSagas;