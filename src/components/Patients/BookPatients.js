import React, { useEffect, useState } from 'react'
// import uniqueRandom from 'unique-random';
import { printData } from "../../message-control/renderer"
import PatientForm from './PatientForm';
import PrinterComp from './PrinterComp';
import Loading from '../Loading'
import {
  // useDispatch,
  useSelector
} from "react-redux";
// import { actions } from "../../actions/actions"
// import Promise from "bluebird";
const AppDAO = require('../../services/appDao').default
const PatientCrud = require('../../services/patientCrud').default


function BookPatients() {
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
  // function loadData() {
  //   var getAllData = this.db.getAllPatients();

  //   Promise.all(getAllData).then((data) => {
  //     console.log(data);
  //     this.loadItem(data);
  //   })

  // }

  // function loadItem(data) {
  //   Object.keys(data).forEach((item) => {
  //     var newItem = {
  //       text: data[item].ToDo,
  //       key: data[item].DT
  //     };

  //     // this.setState((prevState) => {
  //     //   return {
  //     //     items: prevState.items.concat(newItem)
  //     //   };
  //     // });
  //   });
  // }

  // function addItem(e) {
  //   if (this._inputElement.value !== "") {
  //     var newItem = {
  //       text: this._inputElement.value,
  //       key: Date.now()
  //     };

  //     // this.setState((prevState) => {
  //     //   return {
  //     //     items: prevState.items.concat(newItem)
  //     //   };
  //     // });

  //     this.db.insert(newItem.text, newItem.key);
  //     this._inputElement.value = "";
  //   }

  //   console.log(this.state.items, " items added");

  //   e.preventDefault();
  // }

  // function deleteItem(key) {
  //   var filteredItems = this.state.items.filter(function (item) {
  //     return (item.key !== key);
  //   });

  //   // this.setState({
  //   //   items: filteredItems
  //   // });
  //   console.log(`deleting....`)
  //   // this.db.delete(key);
  // }


  const [db, setDb] = useState(null)
  const [showForm, setshowForm] = useState(true)
  const [currId, setcurrId] = useState(null)
  useEffect(() => {
    setDb(setDatabase())
  }, [])
  // const random = uniqueRandom(1, 10000000);
  // const data = {
  //   Pid: random(),
  //   UId: "1",
  //   Tid: "1",
  //   Name: "Daule",
  //   Address: "Manpur Gaya",
  //   Age: "34",
  //   sex: "Male",
  //   CurrentTemp: "99",
  //   CurrentBp: "70/90",
  //   CurrentOxygen: "20",
  //   dateOfAppoint: "12/03/22",
  //   dateOfBooking: "12/03/22"
  // }
  // const clickHandler = async () => {
  //   const res = await db.insertData(data)
  //   console.log(res, " insert data")
  // }
  // const createHandler = async () => {
  //   const res = await db.createTable()
  //   console.log(res, "create table")
  // }
  console.log(db)
  const closeForm = (val) => {
    setshowForm(val)
  }
  const setId = (id) => {
    setcurrId(id)
  }
  const setPrint = (data) => {
    printData(data)
  }
  // const dispatch = useDispatch()
  const loading = useSelector((state) => state.reducers.loading)
  const finalDatas = useSelector((state) => state.reducers.finalDatas)
  const patient = useSelector((state) => state.reducers.patient)
  // const getPatientData = async (currId) => {
  //   console.log("in getPatientData id= ", currId)
  //   const res = await dispatch(actions.getById(currId))
  //   console.log("in printer ", res)
  //   // setpatient(res)
  // }
  useEffect(() => {
    console.log("in useEffect ", finalDatas)
  }, [currId, finalDatas])
  console.log(`finalDatas`, finalDatas)
  if (loading) {
    return <div><Loading /></div>
  }
  const addNewPatient = () => {
    setshowForm(true)
    setcurrId(null)
  }
  return (
    <div>
      {/* <button onClick={clickHandler}>Add Data</button>
      <button onClick={createHandler}>createTable</button> */}
      {showForm && <PatientForm closeForm={closeForm} setId={setId} addNewPatient={addNewPatient} />}
      {!showForm && <PrinterComp id={currId} setPrint={setPrint} addNewPatient={addNewPatient} patient={patient} finalData={finalDatas}></PrinterComp>}
    </div>
  )
}

export default BookPatients
