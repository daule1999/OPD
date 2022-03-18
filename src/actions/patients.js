import {
  // GETALL_PATIENT_REQUEST,
  // GETALL_PATIENT_FAILURE,
  // GETALL_PATIENT_SUCCESS,
  GET_PATIENTS_BYID_FAILURE,
  GET_PATIENTS_BYID_REQUEST,
  GET_PATIENTS_BYID_SUCCESS,
  ADD_PATIENT_FAILURE,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  GET_PATIENTS_PRINT_FAILURE,
  GET_PATIENTS_PRINT_REQUEST,
  GET_PATIENTS_PRINT_SUCCESS
  // DELETE_PATIENT_FAILURE,
  // DELETE_PATIENT_REQUEST,
  // DELETE_PATIENT_SUCCESS
} from "../actionConstants/actionConstants"
import { patientService } from "../services/patientService"

export const patientActions = {
  add,
  remove,
  getById,
  getAll,
  getPrintData
}
function add(patient) {
  return async (dispatch, getState) => {
    dispatch(request(patient));
    try {
      console.group("before actions ", patient)
      const res = await patientService.addPatient(patient)
      console.log(res, " after actions")
      dispatch(success(patient))
      return res

    } catch (error) {
      dispatch(failure(error.toString()));
    }
  }

  function request(patient) {
    return { type: ADD_PATIENT_REQUEST, patient };
  }
  function success(patient) {
    return { type: ADD_PATIENT_SUCCESS, patient };
  }
  function failure(error) {
    return { type: ADD_PATIENT_FAILURE, error };
  }

}
function remove() {

  // function request(user) {
  //   return { type: DELETE_PATIENT_REQUEST, user };
  // }
  // function success(user) {
  //   return { type: DELETE_PATIENT_SUCCESS, user };
  // }
  // function failure(error) {
  //   return { type: DELETE_PATIENT_FAILURE, error };
  // }

}
function getById(id) {
  return async (dispatch, getState) => {
    dispatch(request(id));
    try {
      const res = await patientService.getPatient(id)
      console.log(res, " in actions")
      dispatch(success(res))
      return res

    } catch (error) {
      dispatch(failure(error.toString()));
    }
  }
  function request(id) {
    return { type: GET_PATIENTS_BYID_REQUEST, id };
  }
  function success(patient) {
    return { type: GET_PATIENTS_BYID_SUCCESS, patient };
  }
  function failure(error) {
    return { type: GET_PATIENTS_BYID_FAILURE, id };
  }

}
function getPrintData(patient) {
  const finalPrintData = [{
    type: 'text',
    value: 'ANGELINA LIFE CARE HOSPITAL',
    style: `text-align:center;`,
    css: { "font-weight": "700", "font-size": "18px" }
  }, {
    type: 'text',
    value: 'Mofassil Mod, Khizarsarai Road',
    style: `text-align:center;`,
    css: { "font-weight": "500", "font-size": "14px" }
  }, {
    type: 'text',
    value: 'In front of vishal Petrol Pump',
    style: `text-align:center;`,
    css: { "font-weight": "500", "font-size": "14px" }
  }, {
    type: 'text',
    value: 'Mob no - 9472643340',
    style: `text-align:center;`,
    css: { "font-weight": "500", "font-size": "16px" }
  }, {
    type: 'text',
    value: 'OPD Slip',
    style: `text-align:center;`,
    css: { "font-weight": "600", "font-size": "16px" }
  }, , {
    type: 'table',
    style: 'border: 1px solid #ddd',
    tableBody: [
      [{ type: 'text', value: "Doctor Name" }, { type: 'text', value: "Dr. Angelina" }],
      [{ type: 'text', value: "Patient Name" }, { type: 'text', value: patient.Name }],
      [{ type: 'text', value: `Uid :  ${patient.UId}` }, { type: 'text', valu: ` Uid : patient.Tid` }],
      [{ type: 'text', value: "Address" }, { type: 'text', value: patient.Address }],
      [{ type: 'text', value: "Age" }, { type: 'text', value: patient.Age }],
      [{ type: 'text', value: "Gender" }, { type: 'text', value: patient.sex }],
      [{ type: 'text', value: "Temp." }, { type: 'text', value: patient.CurrentTemp }],
      [{ type: 'text', value: "BP" }, { type: 'text', value: patient.CurrentBp }],
      [{ type: 'text', value: "Oxygen" }, { type: 'text', value: patient.CurrentOxygen }],
      [{
        type: 'text', value: `dateOfAppoint :  ${patient.dateOfAppoint}`
      }, {
        type: 'text', value: `dateOfBooking :  ${patient.dateOfBooking}`
      }],
      [{ type: 'text', value: "Fee" }, { type: 'text', value: "200 Rs" }]
    ],
    value: 'table',
    tableHeaderStyle: 'background-color: #000; color: white;',
    tableBodyStyle: 'border: 0.5px solid #ddd',
    tableFooterStyle: 'background-color: #000; color: white;'
  }];
  return (dispatch, getState) => {
    dispatch(request(patient));
    try {
      // const res = await patientService.getPatient(id)
      console.log(finalPrintData, " finalPrintData in actions")
      dispatch(success({ patient, finalPrintData }))
      return finalPrintData

    } catch (error) {
      dispatch(failure(error.toString()));
    }
  }


  function request(patient) {
    return { type: GET_PATIENTS_PRINT_REQUEST, patient };
  }
  function success(data) {
    return { type: GET_PATIENTS_PRINT_SUCCESS, data };
  }
  function failure(error) {
    return { type: GET_PATIENTS_PRINT_FAILURE, error };
  }
}
function getAll() {

  // function request(user) {
  //   return { type: GETALL_PATIENT_REQUEST, user };
  // }
  // function success(user) {
  //   return { type: GETALL_PATIENT_SUCCESS, user };
  // }
  // function failure(error) {
  //   return { type: GETALL_PATIENT_FAILURE, error };
  // }
}
