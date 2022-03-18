import { alert } from './alert';
import { authentication } from './authentication';
import { combineReducers } from 'redux';
import { registration } from './registration';
import { users } from './users';
import { patients } from "./patients"
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  patients
});

export default rootReducer;