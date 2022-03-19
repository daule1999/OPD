import React from 'react';
import {
    // Router,
    Route, Switch, Redirect
} from 'react-router-dom';
// import { connect } from 'react-redux';

// import { history } from './helpers/history';
// import { PrivateRoute } from './components/PrivateRoute';
import HomePage from './components/HomePage/HomePage';
// import { LoginPage } from './components/LogInPage/LoginPage';
// import { RegisterPage } from './components/RegisterPage/RegisterPage';
import LogIn from './components/LogInPage/LogIn'
import SignUp from './components/RegisterPage/SignUp'
import Profile from './components/OPD/Profile'
import BookPatients from './components/Patients/BookPatients'
// import sendAsync from './message-control/renderer';
// import { printData } from "./message-control/renderer"
import './App.css';
import NavBar from './components/NavBar/NavBar';

function App() {
    // const [message, setMessage] = useState('SELECT * FROM repositories');
    // const [response, setResponse] = useState();

    // function send(sql) {
    //     sendAsync(sql).then((result) => setResponse(result));
    // }

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
                {/* <PrivateRoute exact
                    path="/"
                    render={(props) => <SignUp {...props} />} /> */}
                {/* <Route path="/login" component={LoginPage} /> */}
                {/* <Route path="/register" component={RegisterPage} /> */}
                <Route
                    exact
                    path="/"
                    render={(props) => <HomePage {...props} />}
                />
                <Route exact path="/LogIn" render={(props) => <LogIn {...props} />} />
                <Route
                    exact
                    path="/SignUp"
                    render={(props) => <SignUp {...props} />}
                />
                <Route
                    exact
                    path="/profile"
                    render={(props) => <Profile{...props} />}
                />
                <Route
                    exact
                    path="/patient"
                    render={(props) => <BookPatients{...props} />}
                />

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
