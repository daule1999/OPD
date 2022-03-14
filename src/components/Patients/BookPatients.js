import React, { useEffect, useState } from 'react'
import uniqueRandom from 'unique-random';
import PatientForm from './PatientForm';
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
  useEffect(() => {
    setDb(setDatabase())
  }, [])
  const random = uniqueRandom(1, 10000000);

  const data = {
    Pid: random(),
    UId: "1",
    Tid: "1",
    Name: "Daule",
    Address: "Manpur Gaya",
    Age: "34",
    sex: "Male",
    CurrentTemp: "99",
    CurrentBp: "70/90",
    CurrentOxygen: "20",
    dateOfAppoint: "12/03/22",
    dateOfBooking: "12/03/22"
  }
  const clickHandler = async () => {
    const res = await db.insertData(data)
    console.log(res, " insert data")
  }
  const createHandler = async () => {
    const res = await db.createTable()
    console.log(res, "create table")
  }
  return (
    <div>
      Book Patients
      <button onClick={clickHandler}>Add Data</button>
      <button onClick={createHandler}>createTable</button>
      <PatientForm />
    </div>
  )
}

export default BookPatients
