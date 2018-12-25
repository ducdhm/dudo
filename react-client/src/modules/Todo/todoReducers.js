import {
    TODO_ADD,
    TODO_INIT,
    TODO_TOGGLE,
    TODO_DELETE,
    TODO_FILTER,
    TODO_FILTER_ALL
} from './todoActions';

const todo = (state, action) => {
    switch (action.type) {
        case TODO_ADD:
            return {
                id: action.id,
                text: action.text,
                complete: false
            };
        
        case TODO_TOGGLE:
            return {
                ...state,
                completed: !state.completed
            };
        
        default:
            return state;
    }
};

export const todos = (state = [], action) => {
    switch (action.type) {
        case TODO_ADD:
            return [...state, todo(undefined, action)];
        
        case TODO_TOGGLE:
            return state.map((t) => {
                if (t.id === action.id) {
                    return todo(t, action);
                }
                
                return t;
            });
        
        case TODO_DELETE:
            return state.filter((t) => t.id !== action.id);
        
        case TODO_INIT:
            return action.payload || state;
        
        default:
            return state;
    }
};

export const todoFilter = (state = {
    filter: TODO_FILTER_ALL
}, action) => {
    switch (action.type) {
        case TODO_FILTER:
            return {
                filter: action.filter
            };
        
        default:
            return state;
    }
};