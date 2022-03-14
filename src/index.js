import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
