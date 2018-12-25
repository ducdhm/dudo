import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './modules/App/App';
import store from './common/store';

import './styles/styles.css';

render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
), document.getElementById('root'));