import {
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
  GET_PATIENTS_PRINT_FAILURE
} from "../actionConstants/actionConstants"
const initState = {
  patient: "hii", finalDatas: [
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
    }, , {
      type: 'table',
      style: 'border: 1px solid #ddd',
      value: 'table',
      tableBody: [
        [{ type: 'text', value: "Doctor Name" }, { type: 'text', value: "Dr. Angelina" }],
        [{ type: 'text', value: "Patient Name" }, { type: 'text', value: "Hello" }],
        [{ type: 'text', value: `Uid :  ` }, { type: 'text', valu: ` Uid : ` }],
        [{ type: 'text', value: "Address" }, { type: 'text', value: "Gaya" }],
        [{ type: 'text', value: "Age" }, { type: 'text', value: "26" }],
        [{ type: 'text', value: "Gender" }, { type: 'text', value: "male" }],
        [{ type: 'text', value: "Temp." }, { type: 'text', value: "98" }],
        [{ type: 'text', value: "BP" }, { type: 'text', value: "70/80" }],
        [{ type: 'text', value: "Oxygen" }, { type: 'text', value: "90" }],
        [{
          type: 'text', value: `dateOfAppoint : `
        }, {
          type: 'text', value: `dateOfBooking :`
        }],
        [{ type: 'text', value: "Fee" }, { type: 'text', value: "200 Rs" }],
      ],
      tableHeaderStyle: 'background-color: #000; color: white;',
      tableBodyStyle: 'border: 0.5px solid #ddd',
      tableFooterStyle: 'background-color: #000; color: white;',
    }
  ]
}
export function patients(state = initState, action) {
  console.log(action)
  switch (action.type) {
    case ADD_PATIENT_REQUEST:
    case DELETE_PATIENT_REQUEST:
    case GETALL_PATIENT_REQUEST:
    case GET_PATIENTS_BYID_REQUEST:
    case GET_PATIENTS_PRINT_REQUEST:
      return {
        loading: true
      };
    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.patient,
        loading: false,
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
          }, , {
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
        // ...action,
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
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}