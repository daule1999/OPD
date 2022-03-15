

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
    const sql = `CREATE TABLE IF NOT EXISTS Patient(Pid INTEGER primary key,UId INTEGER ,Tid INTEGER,Name text,Address text,Age INTEGER,gender text,CurrentTemp INTEGER,CurrentBp text,CurrentOxygen text,dateOfAppoint text,dateOfBooking text)`
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

}
export default PatientCrud;