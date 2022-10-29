import { TableAction } from "antd/lib/table/interface";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { DataType } from "../../components/common-types/common-types";
import { GET_INFO_SAGA, SET_INFO_SAGA, SET_INFO_SAGA_ERROR, SET_INFO_SAGA_LOADING } from "./info-types";

export interface TableDataType {
    total: number;
    data: DataType[]
}

export interface TableDataTypeAction {
    type: string;
    payload: any
}

function fetchCallFn(payload: any) {
    return fetch('http://localhost:8080/getInfo', {
        method: "POST",
        headers: {
           "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload),
    })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

function* getInfoData({type, payload}: TableDataTypeAction) {
    yield put({type: SET_INFO_SAGA_LOADING})
    const {response, error} = yield call(fetchCallFn, payload);
    
    if (error) {
        yield put({type: SET_INFO_SAGA_ERROR})
    } else {
        let data: TableDataType = yield response.json()
        
        yield put({type: SET_INFO_SAGA, payload: data})
    }
}

function* watchInfoDataSaga() {
    yield takeLatest(GET_INFO_SAGA, getInfoData)
}

function* infoSagas() {
    yield all([
        call(watchInfoDataSaga)
    ])
}

export default infoSagas;