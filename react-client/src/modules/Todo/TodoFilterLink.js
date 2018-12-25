import React from 'react';
import { connect } from 'react-redux';
import { filterTodo } from './todoActions';

class TodoFilterLink extends React.Component {
    isActive() {
        return this.props.type === this.props.todoFilter;
    }
    
    handleClick(e) {
        e.preventDefault();
        
        this.props.filterTodo(this.props.type);
    }
    
    render() {
        return (
            <span key={this.props.type} style={{margin: '0 2px'}}>
                {
                    this.isActive()
                        ? <span className="btn btn-xs btn-default active">{this.props.children}</span>
                        : <a className="btn btn-xs btn-default" onClick={e => this.handleClick(e)}>{this.props.children}</a>
                }
            </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        todoFilter: state.todoFilter.filter
    }
};

export default connect(mapStateToProps, {
    filterTodo
})(TodoFilterLink);
