import {
  SUCCESS_ALERT,
  ERROR_ALERT,
  CLEAR_ALERT,
  DELETE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  GETALL_FAILURE,
  GETALL_REQUEST,
  GETALL_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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
  GET_PATIENTS_PRINT_SUCCESS,
  // DELETE_PATIENT_FAILURE,
  // DELETE_PATIENT_REQUEST,
  // DELETE_PATIENT_SUCCESS,
  GET_PRINT_REQUEST,
  GET_PRINT_FAILURE,
  GET_PRINT_SUCCESS,
  SET_OPD_REQUEST,
  SET_OPD_SUCCESS,
  SET_OPD_FAILURE,
  GETALL_PATIENT_REQUEST,
  GETALL_PATIENT_SUCCESS,
  GETALL_PATIENT_FAILURE,
  SET_TID_SUCCESS,
  GET_TID_REQUEST,
  GET_TID_SUCCESS,
  GET_TID_FAILURE
} from "../actionConstants/actionConstants"

import { services } from "../services/services";


function login(username, password, from) {
  return (dispatch) => {
    dispatch(request({ username }));

    services.login(username, password).then(
      (user) => {
        if (!user) {
          const msg = "Username or Password Does not Match";
          dispatch(failure(msg));
          // dispatch(alertActions.error(msg));
        } else {
          console.log(user);
          console.log(
            "Authenticated from user.js user => " + JSON.stringify(user)
          );
          dispatch(success(user));
          // dispatch(alertActions.success("Logged in Succesfully"));
          //   history.push(from);
          console.log(`history.push("/");`);
          // history.replace("/");
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
}

function logout() {
  return (dispatch) => {
    // dispatch(alertActions.clear())
    services.logout().then((res) => {
      console.log(`Logged out result => ` + res)
      if (res === "logout") {
        dispatch(logOutUser())
        // dispatch(alertActions.success("Loggout Successfully.."))
      } else {
        // dispatch(alertActions.error("Loggout Failed.."))
      }

    })
  }
  function logOutUser() {
    return { type: LOGOUT };
  }


}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    services.register(user).then(
      (res) => {
        console.log("on user.js " + res)
        if (res === "Registered") {
          dispatch(success());
          // history.push("/login");
          // dispatch(alertActions.success("Registration successful"));
          dispatch(login(user.username, user.password))
        } else if (res === "Already Registered") {
          // dispatch(alertActions.error("Already Registered"))
        }
        else {
          dispatch(failure("Registration Failed"));
          // dispatch(alertActions.error("UserName Already taken"));
        }
        // dispatch(success());
        // history.push("/login");
        // dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    services.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: GETALL_REQUEST };
  }
  function success(users) {
    return { type: GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    services.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: DELETE_FAILURE, id, error };
  }
}

function successAlert(message) {
  return { type: SUCCESS_ALERT, message };
}

function errorAlert(message) {
  return { type: ERROR_ALERT, message };
}

function clearAlert() {
  return { type: CLEAR_ALERT };
}
function add(patient) {
  return async (dispatch, getState) => {
    dispatch(request(patient));
    try {
      console.group("before actions ", patient)
      const res = await services.addPatient(patient)
      console.log(res, " after actions")
      const tidRes = await services.setTid(patient.dateOfBooking)
      console.log(tidRes, " after actions tidRes")
      dispatch({ type: SET_TID_SUCCESS, tidRes })
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
function removePatient() {

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
      const res = await services.getPatient(id)
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
  }, {
    type: 'table',
    style: 'border: 1px solid #ddd',
    tableBody: [
      [{ type: 'text', value: `Uid :  ${patient.UId}` }, { type: 'text', value: ` Uid : patient.Tid` }],
      [{ type: 'text', value: "Doctor Name" }, { type: 'text', value: "Dr. Angelina" }],
      [{ type: 'text', value: "Patient Name" }, { type: 'text', value: patient.name }],
      [{ type: 'text', value: "Address" }, { type: 'text', value: patient.address }],
      [{ type: 'text', value: "Age" }, { type: 'text', value: patient.age }],
      [{ type: 'text', value: "Gender" }, { type: 'text', value: patient.gender }],
      [{ type: 'text', value: "Temp." }, { type: 'text', value: patient.currentTemp }],
      [{ type: 'text', value: "BP" }, { type: 'text', value: patient.currentBp }],
      [{ type: 'text', value: "Oxygen" }, { type: 'text', value: patient.currentOxygen }],
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
      // const res = await services.getPatient(id)
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
function getAllPatients() {
  return async (dispatch, getState) => {
    dispatch(request());
    try {
      const res = await services.getAllPatients()
      console.log(res, " in actions")
      dispatch(success(res))
      return res

    } catch (error) {
      dispatch(failure(error.toString()));
    }
  }

  function request() {
    return { type: GETALL_PATIENT_REQUEST };
  }
  function success(allPatients) {
    return { type: GETALL_PATIENT_SUCCESS, allPatients };
  }
  function failure(error) {
    return { type: GETALL_PATIENT_FAILURE, error };
  }
}
function getPrintStart(id) {
  return (dispatch, getState) => {
    dispatch(request(id));
  }
  function request(id) {
    return { type: GET_PRINT_REQUEST, id };
  }

}
function getPrintDone(id) {
  return (dispatch, getState) => {
    dispatch(success(id));
  }
  function success(id) {
    return { type: GET_PRINT_SUCCESS, id };
  }

}
function getPrintFail(err) {
  return (dispatch, getState) => {
    dispatch(failure(err));
  }
  function failure(error) {
    return { type: GET_PRINT_FAILURE, error };
  }

}

function setOPD(opd) {
  return async (dispatch, getState) => {
    dispatch(request(opd))
    try {
      console.group("before actions ", opd)
      const res = await services.setOPD(opd)
      console.log(res, " after actions")
      dispatch(success(opd))
      return res

    } catch (error) {
      dispatch(failure(error.toString()));
    }
  }

  function request(opd) {
    return { type: SET_OPD_REQUEST, opd };
  }
  function success(opd) {
    return { type: SET_OPD_SUCCESS, opd };
  }
  function failure(error) {
    return { type: SET_OPD_FAILURE, error };
  }
}

function getNextTid(date) {
  return async (dispatch, getState) => {
    dispatch(request());
    try {
      const res = await services.getTid(date)
      console.log(res, " in actions")
      dispatch(success(res))
      return res

    } catch (error) {
      dispatch(failure(error.toString()));
    }
  }
  function request() {
    return { type: GET_TID_REQUEST };
  }
  function success(opd) {
    return { type: GET_TID_SUCCESS, opd };
  }
  function failure(error) {
    return { type: GET_TID_FAILURE, error };
  }
}

export const actions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  clearAlert,
  errorAlert,
  successAlert,
  getById,
  add,
  getPrintData,
  removePatient,
  getAllPatients,
  getPrintStart,
  getPrintDone,
  getPrintFail,
  setOPD,
  getNextTid
};
