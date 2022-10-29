import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './root-reducer';
import { rootSagas } from './root-sagas';


const sagaMiddleware = createSagaMiddleware()


const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas)
export type RootState = ReturnType<typeof store.getState>

export default store;
