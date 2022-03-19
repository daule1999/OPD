// import { alert } from './alert';
// import { authentication } from './authentication';
import { combineReducers } from 'redux';
// import { registration } from './registration';
// import { users } from './users';
// import { patients } from "./patients"
import { reducers } from "./reducers"
const rootReducer = combineReducers({
  // authentication,
  // registration,
  // users,
  // alert,
  // patients,
  reducers
});

export default rootReducer;