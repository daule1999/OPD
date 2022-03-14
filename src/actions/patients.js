import {
  GETALL_PATIENT_REQUEST,
  GETALL_PATIENT_FAILURE,
  GETALL_PATIENT_SUCCESS,
  GET_PATIENTS_BYID_FAILURE,
  GET_PATIENTS_BYID_REQUEST,
  GET_PATIENTS_BYID_SUCCESS,
  ADD_PATIENT_FAILURE,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS
} from "../actionConstants/actionConstants"

function add() {
  return (dispatch) => {
    dispatch(request(user));
    userService.register(user).then(
      (res) => {
        console.log("on user.js " + res)
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  }

  function request(user) {
    return { type: ADD_PATIENT_REQUEST, user };
  }
  function success(user) {
    return { type: ADD_PATIENT_SUCCESS, user };
  }
  function failure(error) {
    return { type: ADD_PATIENT_FAILURE, error };
  }

}
function remove() {

  function request(user) {
    return { type: DELETE_PATIENT_REQUEST, user };
  }
  function success(user) {
    return { type: DELETE_PATIENT_SUCCESS, user };
  }
  function failure(error) {
    return { type: DELETE_PATIENT_FAILURE, error };
  }

}
function getById() {

  function request(user) {
    return { type: GET_PATIENTS_BYID_REQUEST, user };
  }
  function success(user) {
    return { type: GET_PATIENTS_BYID_SUCCESS, user };
  }
  function failure(error) {
    return { type: GET_PATIENTS_BYID_FAILURE, error };
  }

}
function getAll() {

  function request(user) {
    return { type: GETALL_PATIENT_REQUEST, user };
  }
  function success(user) {
    return { type: GETALL_PATIENT_SUCCESS, user };
  }
  function failure(error) {
    return { type: GETALL_PATIENT_FAILURE, error };
  }

}

export const patientActions = {
  add,
  remove,
  getById,
  getAll,
};
