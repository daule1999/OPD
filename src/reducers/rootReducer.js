import { alert } from './alert';
import { authentication } from './authentication';
import { combineReducers } from 'redux';
import { registration } from './registration';
import { users } from './users';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;