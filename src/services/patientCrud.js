

// const patientTableData = {
//   UId: "int",
//   Tid: "int",
//   Name: "varchar(50)",
//   Address: "varchar(200)",
//   Age: "int",
//   sex: "varchar(20)",
//   CurrentTemp: "int",
//   CurrentBp: "varchar(20)",
//   CurrentOxygen: "varchar(20)",
//   dateOfAppoint: "varchar(20)",
//   dateOfBooking: "varchar(20)"
// }

class PatientCrud {
  constructor(dao) {
    this.dao = dao
  }
  createTable() {
    console.log("creating table.......")
    const sql = `CREATE TABLE IF NOT EXISTS Patient(Pid INTEGER primary key,UId INTEGER ,Tid INTEGER,name text,address text,age INTEGER,gender text,currentTemp INTEGER,currentBp text,currentOxygen text,dateOfAppoint text,dateOfBooking text)`
    return this.dao.run(sql);
  }
  dropPatientTable() {
    console.log("dropping table ...")
    const sql = "DROP TABLE people"
    return this.dao.run(sql);
  }
  insertData(patient) {
    console.log("insert.....Data ...", patient)
    return this.dao.run("INSERT INTO Patient values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [patient.PId, patient.UId, patient.Tid, patient.name, patient.address, patient.age, patient.gender, patient.currentTemp, patient.currentBp, patient.currentOxygen, patient.dateOfAppoint, patient.dateOfBooking])
  }
  getAllPatients() {
    console.log("getting all  Patient ...")
    return this.dao.all("select * from Patient")
  }
  getPatientsById(id) {
    console.log("getting Patient by id  ...", id)
    return this.dao.get(`select * from Patient where Pid=${id}`)
  }
  createOPDTable() {
    console.log("creating OPD table.......")
    const sql = `CREATE TABLE IF NOT EXISTS OPDTable(id INTEGER primary key AUTOINCREMENT,opdName text,address1 text,address2 text,landmark text,doctorName text,qualification text,doctorNo text,staffNo text)`
    return this.dao.run(sql);
  }
  dropOPDTable() {
    console.log("dropping table ...")
    const sql = "DROP TABLE OPDTable"
    return this.dao.run(sql);
  }
  insertOPDData(opd) {
    console.log("insert.....Data ...", opd)
    // this.dao.run("DELETE FROM OPDTable IF EXISTS ")
    return this.dao.run("INSERT INTO OPDTable values(?,?,?,?,?,?,?,?,?)",
      [1, opd.opdName, opd.address1, opd.address2, opd.landmark, opd.doctors[0].doctorName, opd.doctors[0].qualification, opd.doctors[0].doctorNo, opd.doctors[0].staffNo,])
  }
  getOPD() {
    console.log("getting all  OPDTable ...")
    return this.dao.all("select * from OPDTable")
  }

}
export default PatientCrud;