import React, { useState } from 'react';
import {
    // Router,
    Route, Switch, Redirect, Link
} from 'react-router-dom';
// import { connect } from 'react-redux';

// import { history } from './helpers/history';
// import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './components/HomePage/HomePage';
import { LoginPage } from './components/LogInPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';

import sendAsync from './message-control/renderer';
// import { printData } from "./message-control/renderer"
import './App.css';
import NavBar from './components/NavBar/NavBar';

function App() {
    // const [message, setMessage] = useState('SELECT * FROM repositories');
    const [response, setResponse] = useState();

    function send(sql) {
        sendAsync(sql).then((result) => setResponse(result));
    }

    return (
        <div className="App">
            <NavBar />
            {/* <input
                type="text"
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
            />
            <button type="button" onClick={() => send(message)}>
                Send
            </button>
            <br />
            <p>Main process responses:</p>
            <br />
            <pre>
                {(response && JSON.stringify(response, null, 2)) ||
                    'No query results yet!'}
            </pre> */}
            <Switch>
                <PrivateRoute exact path="/" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>

    );
}

export default App;
// import React from 'react';


// class App extends React.Component {
//     constructor(props) {

//         history.listen((location, action) => {
//             // clear alert on location change
//             this.props.clearAlerts();
//         });
//     }

//     render() {
//         const { alert } = this.props;
//         return (
//             <div className="jumbotron">
//                 <div className="container">
//                     <div className="col-sm-8 col-sm-offset-2">
//                         {alert.message &&
//                             <div className={`alert ${alert.type}`}>{alert.message}</div>
//                         }
//                         <Router history={history}>
//                             <Switch>
//                                 <PrivateRoute exact path="/" component={HomePage} />
//                                 <Route path="/login" component={LoginPage} />
//                                 <Route path="/register" component={RegisterPage} />
//                                 <Redirect from="*" to="/" />
//                             </Switch>
//                         </Router>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// function mapState(state) {
//     const { alert } = state;
//     return { alert };
// }

// const actionCreators = {
//     clearAlerts: alertActions.clear
// };

// const connectedApp = connect(mapState, actionCreators)(App);
// export { connectedApp as App };
