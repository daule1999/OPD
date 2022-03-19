import {
  SUCCESS_ALERT,
  ERROR_ALERT,
  CLEAR_ALERT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
  GETALL_PATIENT_REQUEST,
  GETALL_PATIENT_SUCCESS,
  GETALL_PATIENT_FAILURE,
  GET_PATIENTS_BYID_REQUEST,
  GET_PATIENTS_BYID_SUCCESS,
  GET_PATIENTS_BYID_FAILURE,
  GET_PATIENTS_PRINT_REQUEST,
  GET_PATIENTS_PRINT_SUCCESS,
  GET_PATIENTS_PRINT_FAILURE,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_PRINT_REQUEST,
  GET_PRINT_FAILURE,
  GET_PRINT_SUCCESS
} from "../actionConstants/actionConstants"
import { initState } from "./AppState"

export function reducers(state = initState, action) {
  console.log(state, "in reducer state")
  switch (action.type) {
    case SUCCESS_ALERT:
      return {
        ...state,
        alert: {
          type: "success",
          message: action.message,
        },
        loading: false
      };
    case ERROR_ALERT:
      return {
        ...state,
        alert: {
          type: "error",
          message: action.message
        },
        loading: false
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: {
          type: "info"
        },
        loading: false
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        loading: false
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        user: {
          username: "Bhola",
          password: "123456789",
        },
        loggedIn: false,
        loading: false

      };
    case LOGOUT:
      return {
        ...state,
        user: {
          username: "Bhola",
          password: "123456789",
        },
        loggedIn: false,
        loading: false

      };
    case ADD_PATIENT_REQUEST:
    case DELETE_PATIENT_REQUEST:
    case GETALL_PATIENT_REQUEST:
    case GET_PATIENTS_BYID_REQUEST:
    case GET_PATIENTS_PRINT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.patient,
        loading: false,
        TodayPatients: [
          ...state.TodayPatients,
          action.patient
        ],
        finalDatas: [
          {
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
            value: 'table',
            tableBody: [
              [{ type: 'text', value: "Doctor Name" }, { type: 'text', value: "Dr. Angelina" }],
              [{ type: 'text', value: "Patient Name" }, { type: 'text', value: action.patient.name }],
              [{ type: 'text', value: `UId :  ${action.patient.UId}` }, { type: 'text', valu: ` Tid : ${action.patient.Tid}` }],
              [{ type: 'text', value: "Address" }, { type: 'text', value: action.patient.address }],
              [{ type: 'text', value: "Age" }, { type: 'text', value: action.patient.age }],
              [{ type: 'text', value: "Gender" }, { type: 'text', value: action.patient.gender }],
              [{ type: 'text', value: "Temp." }, { type: 'text', value: action.patient.currentTemp }],
              [{ type: 'text', value: "BP" }, { type: 'text', value: action.patient.currentBp }],
              [{ type: 'text', value: "Oxygen" }, { type: 'text', value: action.patient.currentOxygen }],
              [{
                type: 'text', value: `dateOfAppoint : ${action.patient.dateOfAppoint}`
              }, {
                type: 'text', value: `dateOfBooking : ${action.patient.dateOfBooking}`
              }],
              [{ type: 'text', value: "Fee" }, { type: 'text', value: "200 Rs" }],
            ],
            tableHeaderStyle: 'background-color: #000; color: white;',
            tableBodyStyle: 'border: 0.5px solid #ddd',
            tableFooterStyle: 'background-color: #000; color: white;',
          }
        ]
      };
    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        // ...action,
        loading: false
      };
    case GETALL_PATIENT_SUCCESS:
      return {
        ...state,
        TodayPatients: [
          ...state.TodayPatients,
          ...action.allPatients
        ],
        loading: false
      };
    case GET_PATIENTS_BYID_SUCCESS:
      return {
        patient: action.patient,
        loading: false
      };
    case GET_PATIENTS_PRINT_SUCCESS:
      return {
        ...state,
        patient: action.data.patient,
        finalPrintData: action.data.finalPrintData,
        loading: false
      };
    case ADD_PATIENT_FAILURE:
    case DELETE_PATIENT_FAILURE:
    case GETALL_PATIENT_FAILURE:
    case GET_PATIENTS_BYID_FAILURE:
    case GET_PATIENTS_PRINT_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
        loading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        loading: false
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        loading: false
      };
    case GET_PRINT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_PRINT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        notPrinted: [
          ...state.notPrinted,
          action.id
        ]
      }
    case GET_PRINT_SUCCESS:
      return {
        ...state,
        loading: false,
        printed: [
          // ...state.printed,
          action.id
        ]
      }
    default:
      return state;
  }
}