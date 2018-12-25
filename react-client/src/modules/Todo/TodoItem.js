import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from './todoActions';

class TodoItem extends React.Component {
    handleClick(e) {
        e.preventDefault();
        
        this.props.toggleTodo(this.props.id);
    }
    
    handleRemove(e) {
        e.preventDefault();
        
        this.props.deleteTodo(this.props.id);
    }
    
    render() {
        return (
            <tr>
                <td
                    onClick={(e) => this.handleClick(e)}
                >
                    {
                        this.props.completed ? <i className="fa fa-check-square-o"></i> : <i className="fa fa-square-o"></i>
                    }
                </td>
                <td
                    style={{
                        textDecoration: this.props.completed ? 'line-through' : ''
                    }}
                >{this.props.text}</td>
                <td>
                    <a
                        className="close"
                        onClick={e => this.handleRemove(e)}
                    >&times;</a>
                </td>
            </tr>
        );
    }
}

export default connect(null, {
    toggleTodo,
    deleteTodo
})(TodoItem);
