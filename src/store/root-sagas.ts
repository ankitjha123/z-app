import { all, call } from 'redux-saga/effects'
import graphSagas from './graph-saga/graph-sagas'
import infoSagas from './info-saga/info-sagas'

export function* rootSagas() {
    yield all([
        call(infoSagas),
        call(graphSagas)
    ])
}