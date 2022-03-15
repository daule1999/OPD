import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { patientActions } from "../../actions/patients"

import PatientData from './PatientData'
function PrinterComp({ id, setPrint }) {
  const dispatch = useDispatch()
  const [patient, setpatient] = useState({})

  const getPatientData = async () => {
    const res = await dispatch(patientActions.getById(id))
    console.log("in printer ", res)
    setpatient(res)
  }
  useEffect(() => {
    getPatientData()
  }, [])
  return (
    <div>{patient &&
      <Box width="50%" mx="auto">
        <PatientData patient={patient} setPrint={setPrint} />
      </Box>}

    </div>
  )
}

export default PrinterComp
