import React from 'react';
import { connect } from 'react-redux';

class Loading extends React.Component {
    render() {
        return this.props.isLoading ? <div className="loading"></div> : '';
    }
}

const mapStatesToProps = (state) => {
    return {
        isLoading: state.loading.loading
    }
};

export default connect(
    mapStatesToProps
)(Loading);
