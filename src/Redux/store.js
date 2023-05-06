import {createStore , applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer'

import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware();
// const thunkMiddleware = [thunk];
// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);