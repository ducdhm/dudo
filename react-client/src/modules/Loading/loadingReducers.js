import {
    LOADING_HIDE,
    LOADING_SHOW
} from './loadingActions';

const initState = {
    loading: true
};

export const loading = (state = initState, action) => {
    switch (action.type) {
        case LOADING_SHOW:
            return {
                loading: true
            };
        
        case LOADING_HIDE:
            return {
                loading: false
            };
        
        default:
            return state;
    }
};