import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import React from 'react';
import TodoItem from './TodoItem';
import {
    TODO_FILTER_ALL,
    TODO_FILTER_ACTIVE,
    TODO_FILTER_COMPLETED
} from './todoActions';
import { initTodo } from './todoActions';

class TodoList extends React.Component {
    componentDidMount() {
        this.props.initTodo();
    }
    
    render() {
        return (
            <table className="table table-hover text-lg table-todo">
                <colgroup>
                    <col width="35" />
                </colgroup>
                <tbody>
                    {
                        this.props.todos.map && this.props.todos.map(todo =>
                            <TodoItem key={todo.id} {...todo} />
                        )
                    }
                </tbody>
            </table>
        );
    }
}

const getVisibleTodos = (todos, action) => {
    switch (action.filter) {
        case TODO_FILTER_ALL:
            return todos;
        
        case TODO_FILTER_ACTIVE:
            return todos.filter(t => !t.completed);
        
        case TODO_FILTER_COMPLETED:
            return todos.filter(t => t.completed);
        
        default:
        // Do nothing
    }
};

const mapStatesToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.todoFilter)
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        initTodo
    }, dispatch)
};

export default connect(mapStatesToProps, mapDispatchToProps)(TodoList);