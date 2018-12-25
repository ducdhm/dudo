import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../Login/loginActions';

class Navbar extends React.Component {
    handleLogout(e) {
        e.preventDefault();
        
        this.props.logout();
    }
    
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">Reno</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink to="/"><i className="fa fa-home"></i> </NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo">Todo</NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a>
                                Hello {' '}
                                <label className="label label-info">{this.props.username}</label>
                            </a>
                        </li>
                        <li>
                            <a
                                role="button"
                                onClick={e => this.handleLogout(e)}
                            >Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStatesToProps = (state) => {
    return {
        username: state.login.username
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout
    }, dispatch)
};

export default connect(mapStatesToProps, mapDispatchToProps)(Navbar);