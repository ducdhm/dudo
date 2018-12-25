import request from '../../common/request';
import qs from 'qs';
import { hideLoading, showLoading } from '../Loading/loadingActions';

export const TODO_ADD = 'TODO_ADD';
export const TODO_INIT = 'TODO_INIT';
export const TODO_TOGGLE = 'TODO_TOGGLE';
export const TODO_DELETE = 'TODO_DELETE';
export const TODO_FILTER = 'TODO_FILTER';
export const TODO_FILTER_ALL = 'TODO_FILTER_ALL';
export const TODO_FILTER_ACTIVE = 'TODO_FILTER_ACTIVE';
export const TODO_FILTER_COMPLETED = 'TODO_FILTER_COMPLETED';

export const initTodo = () => {
    return (dispatch) => {
        dispatch(showLoading());
        
        request({
            method: 'get',
            url: '/api/todo'
        }).then((response) => {
            dispatch({
                type: TODO_INIT,
                payload: response.data.todos
            });
            dispatch(hideLoading());
        });
    };
};

export const addTodo = (text) => {
    return (dispatch) => {
        dispatch(showLoading());
        request({
            method: 'post',
            url: '/api/todo/new',
            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                text
            })
        }).then((response) => {
            dispatch({
                type: TODO_ADD,
                ...response.data.todo
            });
            dispatch(hideLoading());
        });
    };
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch(showLoading());
        
        request({
            method: 'post',
            url: `/api/todo/${id}/delete`
        }).then(() => {
            dispatch({
                type: TODO_DELETE,
                id
            });
            dispatch(hideLoading());
        });
    };
};

export const toggleTodo = (id) => {
    return (dispatch) => {
        dispatch(showLoading());
        request({
            method: 'post',
            url: `/api/todo/${id}/toggle`
        }).then(() => {
            dispatch({
                type: TODO_TOGGLE,
                id
            });
            dispatch(hideLoading());
        });
    };
};

export const filterTodo = (filter) => {
    return {
        type: TODO_FILTER,
        filter
    }
};