import React from 'react';
import { connect } from 'react-redux';
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

class Todo extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading text-lg">Toto List</div>
                            <TodoAdd />
                            <TodoList />
                            <TodoFilter />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Todo);
