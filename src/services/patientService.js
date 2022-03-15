
const AppDAO = require('../services/appDao').default
const PatientCrud = require('../services/patientCrud').default

function setDatabase() {
  const dao = new AppDAO('./database.sqlite3');
  const db = new PatientCrud(dao);
  db.createTable()
    .then(() => {
      console.log('db is created...')
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    });
  return db;
}

async function addPatient(patient) {
  const db = setDatabase();
  try {
    console.log("before service ", patient)
    const res = await db.insertData(patient)
    console.log("in service patient = ", res)
    return { PID: res.id, ...patient };
  } catch (err) {
    console.log("in service ", err)
  }
}

async function getPatient(id) {
  const db = setDatabase();
  try {
    const res = await db.getPatientsById(id)
    console.log("in service patient = ", res)
    return { ...res };
  } catch (err) {
    console.log("in service ", err)
  }
}

export const patientService = {
  addPatient,
  getPatient
};