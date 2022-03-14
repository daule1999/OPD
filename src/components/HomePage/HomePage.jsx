import React from 'react'
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
  const isLoggeIn = useSelector((state) => state.authentication.loggedIn);
  const user = useSelector((state) => state.user);
  const isAuthAllowed = useSelector((state) => state.authentication.isAuthAllowed);
  return (
    <div>
      {isLoggeIn && <div>Logged in as <pre>{user}</pre></div>}
      {isAuthAllowed && <div>Auth is alllowed</div>}
    </div>
  )
}

export default HomePage
