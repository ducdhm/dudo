import {
    LOGIN,
    LOGOUT
} from './loginActions';

const initState = {
    isAuthenticated: false,
    username: null
};

export const login = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                ...action.payload
            };
        
        case LOGOUT:
            return initState;
        
        default:
            return state;
    }
};