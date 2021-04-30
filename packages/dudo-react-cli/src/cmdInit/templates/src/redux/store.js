import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

if (module.hot) {
    module.hot.accept('./rootReducer', () => {
        const nextRootReducer = require('./rootReducer');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
