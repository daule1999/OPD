import React from 'react'
import {
  useDispatch,
  useSelector
} from "react-redux";
import CollapsibleTable from './CollapsibleTable';
// import TodoList from '../../Sqlite3/TodoList';
import { actions } from "../../actions/actions"
function HomePage() {
  const dispatch = useDispatch()
  const isLoggeIn = useSelector((state) => state.reducers.loggedIn);
  const user = useSelector((state) => state.reducers.user);
  const isAuthAllowed = useSelector((state) => state.reducers.isAuthAllowed);
  const TodayPatients = useSelector(state => state.reducers.TodayPatients)
  const getAllPatients = () => {
    dispatch(actions.getAllPatients())
  }
  return (
    <div>
      {isLoggeIn && <div>Logged in as <pre>{user}</pre></div>}
      {isAuthAllowed && <div>Auth is alllowed</div>}
      {/* <TodoList /> */}
      <pre>{JSON.stringify(TodayPatients)}  </pre>
      This is HomePage (under development)
      <button onClick={getAllPatients}>Get all patients from database</button>
      <CollapsibleTable TodayPatients={TodayPatients} />
    </div>
  )
}

export default HomePage
