import db from "./appDao"

const patientTableData = {
  UId: "int",
  Tid: "int",
  Name: "varchar(50)",
  Address: "varchar(200)",
  Age: "int",
  sex: "varchar(20)",
  CurrentTemp: "int",
  CurrentBp: "varchar(20)",
  CurrentOxygen: "varchar(20)",
  dateOfAppoint: "varchar(20)",
  dateOfBooking: "varchar(20)"
}
function createPTable() {
  console.log("creating table.......")
  db.run("CREATE TABLE IF NOT EXISTS Patient(Pid INTEGER primary key,UId INTEGER ,Tid INTEGER,Name text text,Age INTEGER,CurrentTemp INTEGER,CurrentBp text,CurrentBp text,CurrentOxygen text,dateOfAppoint text,dateOfBooking text)", () => {
    console.log("table created")
  })
}
function dropPatientTable() {
  console.log("dropping table ...")
  db.run("DROP TABLE people", () => {
    console.log("Table deleted")
  })
}

function insertData(patient) {
  console.log("insert.....Data ...")
  db.run("INSERT INTO Patient values(?,?,?,?,?,?,?,?,?,?,?,?)", [Pid, UId, Tid, Name, Address, Age, sex, CurrentTemp, CurrentBp, CurrentOxygen, dateOfAppoint, dateOfBooking], () => {
    console.log("Data inserted")
  })
}

function getAllPatients() {
  console.log("getting all  Patient ...")
  db.run("select * from Patient", () => {
    console.log("All Patient Fetched")
  })
}

function dropPatientTable(id) {
  console.log("getting Patient by id  ...", id)
  return db.run("select * from Patient where Pid=?", [id], () => {
    console.log("Patient fertched by id ", id)
  })
}