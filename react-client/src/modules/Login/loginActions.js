import request from '../../common/request';
import { hideLoading, showLoading } from '../Loading/loadingActions';
import qs from 'qs';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const checkAuthentication = () => {
    return (dispatch) => {
        let storedJwt = localStorage.getItem('jwt');
        if (storedJwt) {
            request({
                method: 'get',
                url: '/api/ping'
            }).then((response) => {
                dispatch({
                    type: LOGIN,
                    payload: {
                        username: response.data.username
                    }
                });
                dispatch(hideLoading());
            }).catch((response) => {
                console.log(response);
                dispatch(hideLoading());
            });
        } else {
            dispatch(hideLoading());
        }
    }
};

export const login = (username, password) => {
    return (dispatch) => {
        dispatch(showLoading());
        request({
            method: 'post',
            url: '/api/login',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                username,
                password
            })
        }).then((response) => {
            if (response && response.data.access_token) {
                dispatch({
                    type: LOGIN,
                    payload: response.data
                });
                localStorage.setItem('jwt', `JWT ${response.data.access_token}`);
            }
            dispatch(hideLoading());
        });
    };
};

export const logout = () => {
    localStorage.removeItem('jwt');
    
    return {
        type: LOGOUT
    }
};