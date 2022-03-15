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
