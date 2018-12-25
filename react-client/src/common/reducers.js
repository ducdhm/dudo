import { combineReducers } from 'redux';
import * as todoReducers from '../modules/Todo/todoReducers';
import * as loadingReducers from '../modules/Loading/loadingReducers';
import * as loginReducers from '../modules/Login/loginReducers';

const allReducers = Object.assign({},
    todoReducers,
    loadingReducers,
    loginReducers
);

const reducers = combineReducers(allReducers);

export default reducers;