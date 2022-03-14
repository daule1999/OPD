import React from 'react'
import {
  // useDispatch,
  useSelector
} from "react-redux";
import TodoList from '../../Sqlite3/TodoList';
function HomePage() {
  const isLoggeIn = useSelector((state) => state.authentication.loggedIn);
  const user = useSelector((state) => state.user);
  const isAuthAllowed = useSelector((state) => state.authentication.isAuthAllowed);
  return (
    <div>
      {isLoggeIn && <div>Logged in as <pre>{user}</pre></div>}
      {isAuthAllowed && <div>Auth is alllowed</div>}
      <TodoList />
    </div>
  )
}

export default HomePage
