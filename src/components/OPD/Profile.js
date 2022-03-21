import React from 'react'
// import { OPDConst } from "./OPDconst"
import {
  useSelector,
  // useDispatch
} from 'react-redux'
// import { actions } from "../../actions/actions"
import { Box, Grid, Typography } from '@material-ui/core'
function Profile() {
  // const dispatch = useDispatch()
  const data = useSelector(state => state.reducers.OPD)
  return (
    <div>
      <Box>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Grid item>
            <Typography>
              {data.opdName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {data.address1}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {data.address2}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {data.landmark}
            </Typography>
          </Grid>
          <Grid item >
            {data.doctors.map(e => {
              return <Grid container key={e} justifyContent='space-evenly'>
                <Grid item>
                  {e.doctorName && <Typography>Doctor Name : {e.doctorName}</Typography>}
                </Grid>
                <Grid item>
                  {e.qualification && <Typography>Qualification : {e.qualification}</Typography>}
                </Grid>
                <Grid item>
                  {e.doctorNo && <Typography>Doctor No : {e.doctorNo}</Typography>}
                </Grid>
                <Grid item>
                  {e.staffNo && <Typography>staff No : {e.staffNo}</Typography>}
                </Grid>
              </Grid>
            })}
          </Grid>

        </Grid>
      </Box>
      {/* <button onClick={() => { dispatch(actions.setOPD(OPDConst)) }}>ADD</button> */}
    </div >
  )
}

export default Profile
