import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import Login from '../Login/Login';
import Loading from '../Loading/Loading';
import Navbar from '../Navbar/Navbar';
import Todo from '../Todo/Todo';
import Home from '../Home/Home';

class App extends React.Component {
    render() {
        let isAuthenticated = this.props.isAuthenticated;
        
        return (
            <Fragment>
                {!isAuthenticated ? <Login /> : (
                    <Fragment>
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/todo" component={Todo} />
                        </Switch>
                    </Fragment>
                )}
                <Loading />
            </Fragment>
        );
    };
}

const mapStatesToProps = (state) => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
};

export default withRouter(connect(mapStatesToProps)(App));
