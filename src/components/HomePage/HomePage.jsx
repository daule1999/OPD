import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector
} from "react-redux";
import CollapsibleTable from './CollapsibleTable';
// import TodoList from '../../Sqlite3/TodoList';
import { actions } from "../../actions/actions"
import { Box, Grid, Button } from "@material-ui/core"
// import EnhancedTable from './EnhancedTable';
const getDateString = (date) => {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
function HomePage() {
  const dispatch = useDispatch()
  const isLoggeIn = useSelector((state) => state.reducers.loggedIn);
  const user = useSelector((state) => state.reducers.user);
  const isAuthAllowed = useSelector((state) => state.reducers.isAuthAllowed);
  const TodayPatients = useSelector(state => state.reducers.TodayPatients)
  const [patients, setPatients] = React.useState([...TodayPatients])
  const [allPatients, setAllPatients] = React.useState([...TodayPatients])
  const [doc, setDoc] = React.useState(0)

  const getAllPatients = () => {
    dispatch(actions.getAllPatients())
  }
  const getPatientsByDate = () => {
    const date = getDateString(new Date())
    dispatch(actions.getPatientsByDate(date))
  }

  const changeDoc = (doc) => {
    console.log(allPatients, "allPatients in changeDoc")
    const newPat = allPatients.filter(item => {
      console.log(item, "arr in filter")
      console.log("doc = ", doc, "patient doc ", item.doctor)
      if (doc === 0) {
        return true;
      }
      return item.doctor === +doc

    })
    console.log(newPat, "newPat")
    setPatients(newPat)
  }
  const handleDocChange = (event) => {
    const currDoc = event.target.value
    console.log(currDoc)
    setDoc(currDoc)
    changeDoc(currDoc)
  }
  useEffect(() => {
    console.log("changing allpat setAllPatients,")
    setAllPatients(TodayPatients)
  }, [TodayPatients])

  // useEffect(() => {
  //   console.log("changing patients setPatients,")
  //   setPatients(TodayPatients)
  // }, [TodayPatients])

  useEffect(() => {
    console.log("changing filterdata changeDoc")
    changeDoc(doc)
  }, [TodayPatients])
  console.log("TodayPatients in home = ", TodayPatients)
  console.log("patients in home(allPat) = ", patients)
  console.log("allPatients in home = ", allPatients)
  return (
    <div>
      {/* {isLoggeIn && <div>Logged in as <pre>{user}</pre></div>} */}
      {/* {isAuthAllowed && <div>Auth is alllowed</div>} */}
      {/* <TodoList /> */}
      {/* <pre>{JSON.stringify(TodayPatients)}  </pre> */}
      {/* This is HomePage (under development) */}
      <Box mt={2}>
        <Grid container justifyContent="space-evenly">
          <Grid item>
            <Button variant="contained" color="secondary" onClick={getAllPatients}>Get All Patients</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={getPatientsByDate}>Get all patients For Today</Button>
          </Grid>
        </Grid>
      </Box>
      <CollapsibleTable allPat={patients} handleDocChange={handleDocChange} doc={doc} />
      {/* <EnhancedTable /> */}
    </div>
  )
}

export default HomePage
