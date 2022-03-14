import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {
    // BrowserRouter, 
    HashRouter
} from "react-router-dom";
import { store } from './store'
import { history } from './helpers/history'
// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();



ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter history={history}>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

