var dateObj = new Date();
dateObj.setDate(dateObj.getDate() - 1);

export const initState = {
  user: {
    username: "Bhola",
    password: "123456789",
  },
  prevId: 0,
  loggedIn: false,
  isAuthAllowed: true,
  patient: "hii",
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
  ],
  alert: {
    type: "info"
  },
  notPrinted: [],
  Printed: [],
  TodayPatients: [],
  OPD: {
    opdName: "ANGELINA LIFE CARE HOSPITAL",
    address1: "Mofassil Mod, Khizarsarai Road",
    address2: "",
    landmark: "In front of vishal Petrol pump",
    doctors: [
      {
        doctorName: "",
        qualification: "",
        doctorNo: "",
        staffNo: "9472643340"
      }
    ]
  },
  prevDate: dateObj
}