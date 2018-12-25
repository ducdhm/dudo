import React from 'react';
import { connect } from 'react-redux';
import { checkAuthentication, login } from './loginActions';
import { bindActionCreators } from 'redux';

class Login extends React.Component {
    componentDidMount() {
        this.props.checkAuthentication();
        document.body.classList.add('login-page');
    }
    
    componentWillUnmount() {
        document.body.classList.remove('login-page');
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;
        
        this.props.login(username, password);
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                        <div className="panel panel-default panel-login">
                            <div className="panel-body">
                                <h1 className="text-center">Login</h1>
                                <form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
                                    <p className="input-group input-group-lg">
                                        <span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span>
                                        <input type="text" name="username" className="form-control" placeholder="Enter your username" />
                                    </p>
                                    <p className="input-group input-group-lg">
                                        <span className="input-group-addon"><i className="fa fa-fw fa-lock"></i></span>
                                        <input type="password" name="password" className="form-control" placeholder="Enter your password" />
                                    </p>
                                    <div className="text-center">
                                        <button className="btn btn-lg btn-block btn-primary" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        checkAuthentication,
        login
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(Login);