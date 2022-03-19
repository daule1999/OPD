import { Box, Button, Grid } from '@material-ui/core';
import React, {
  // useEffect,
  useState
} from 'react'
// import {
//   useDispatch,
//   useSelector
// } from "react-redux";
import Switch from '@mui/material/Switch';
import { FunctionalComponentWithFunctionalComponentToPrint } from "./REacttoPrinter"
import PatientData from './PatientData'
function PrinterComp({ id, setPrint, finalData, patient, addNewPatient }) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // useEffect(() => {
  //   console.log("here")
  //   getPatientData()
  // })
  return (
    <div>{patient &&
      <Box width="50%" mx="auto">
        <Grid container justifyContent="space-evenly">
          <Grid item>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={addNewPatient}>
              Book New Patient
            </Button>
          </Grid>
        </Grid>


        {checked ?
          <PatientData patient={patient} setPrint={setPrint} finalData={finalData} />
          : <FunctionalComponentWithFunctionalComponentToPrint addNewPatient={addNewPatient} id={patient.Uid} />
        }
      </Box>}

    </div>
  )
}

export default PrinterComp
