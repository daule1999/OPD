import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {
  useDispatch,
  useSelector
} from "react-redux";
import { patientActions } from "../../actions/patients"
import Switch from '@mui/material/Switch';
import { FunctionalComponentWithFunctionalComponentToPrint } from "./REacttoPrinter"
import PatientData from './PatientData'
function PrinterComp({ id, setPrint, finalData, patient }) {
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
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {checked ?
          <PatientData patient={patient} setPrint={setPrint} finalData={finalData} />
          : <FunctionalComponentWithFunctionalComponentToPrint />
        }
      </Box>}

    </div>
  )
}

export default PrinterComp
