const AppDAO = require('../services/appDao').default
const PatientCrud = require('../services/patientCrud').default

export const services = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  addPatient,
  getPatient,
  setOPD,
  getAllPatients,
  setTid,
  getTid,
  getAllPatientsBydate
};


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
    console.log("in service patient = ", id)
    const res = await db.getPatientsById(id)
    console.log("in service patient = ", res)
    return { ...res };
  } catch (err) {
    console.log("in service ", err)
  }
}
async function getAllPatients() {
  const db = setDatabase();
  try {
    console.log("in service getAllPatients = ")
    const res = await db.getAllPatients()
    console.log("in service getAllPatients = ", res)
    return res;
  } catch (err) {
    console.log("in service ", err)
  }
}

async function getAllPatientsBydate(date) {
  const db = setDatabase();
  try {
    console.log("in service getAllPatients = ")
    const res = await db.getAllPatientsByDate(date)
    console.log("in service getAllPatients = ", res)
    return res;
  } catch (err) {
    console.log("in service ", err)
  }
}

async function login(username, password) {
  // const session_url = "/users/login"//"http://localhost:5003/users/login" 
  // const uname = username;
  // const pass = password;
  // return await axios
  //   .post(
  //     session_url,
  //     {},
  //     {
  //       auth: {
  //         username: uname,
  //         password: pass,
  //       },
  //     }
  //   )
  //   .then(function (response) {
  //     console.log(response);
  //     console.log("user => " + JSON.stringify(response.config.auth));
  //     if (response.data === "Authenticated.." && response.status === 200)
  //       return response.config.auth;
  //     else if (response.status === 403) {
  //       return "Username or Password Does not Match";
  //     }
  //   })
  //   // .then((result)=>{
  //   //     console.log(`here result is ${JSON.stringify(result)}`)
  //   //     return result;
  //   // })
  //   .catch(function (error) {
  //     console.log("Error on Authentication");
  //   });
}

async function logout() {
  // remove user from local storage to log user out
  // const session_url = "/users/login" //"http://localhost:5003/users/login" //`${axiosUrl}+/users/logout`;
  // return await axios
  //   .get(session_url, {})
  //   .then((response) => {
  //     console.log(response);
  //     if (response.status === 200) {
  //       localStorage.removeItem("user");
  //       return "logout";
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Failed to logOut");
  //   });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader()
  };

  return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    // headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

async function register(user) {
  // const session_url = `${axiosUrl}+/users/signup`;
  // const session_url = "/users/signup" //"http://localhost:5003/users/signup";
  // return await axios
  //   .post(session_url, user, {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     if (response.status === 200) {
  //       return "Registered";
  //     } else if (response.status === 403) {
  //       return "Already Registered";
  //     } else {
  //       return "error";
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Error on reistering ...");
  //     return "Error on reistering ...";
  //   });
}

// return fetch(`/users/register`, requestOptions).then(handleResponse);
// }

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: {
      // ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    // headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log("text => " + text);
    console.log("data => " + data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

async function setOPD(opd) {
  const db = setDatabase();
  try {
    console.log("before service ", opd)
    const cres = await db.createOPDTable()
    if (cres) {
      const res = await db.insertOPDData(opd)
      console.log("in service patient = ", res)
      return res;
    } else {
      console.log("in service error")
      return
    }
  } catch (err) {
    console.log("in service ", err)
  }
}

async function setTid(date) {
  const db = setDatabase();
  try {
    console.log("before service ", date)
    const cres = await db.createTidTable()
    console.log("TidTable created", cres)
    if (cres) {
      const getRes = await db.getCurrentTid(date)
      console.log(getRes, "getRes")
      if (getRes?.currentTid > 0) {
        const tid = getRes.currentTid + 1
        console.log("setting setNextTid ", tid, date)
        const res = await db.setNextTid({ tid, date })
        console.log("in service setTid = ", { id: tid })
        return { id: tid }
      } else {
        const neres = await db.insertNewTid(date)
        console.log("in service setTid insertNewTid", neres)
        return { id: 2 };
      }

    }
  } catch (err) {
    console.log("in service setTid ", err)
  }
}

async function getTid(date) {
  const db = setDatabase();
  try {
    console.log("before service getTid", date)
    const cres = await db.createTidTable()
    if (cres) {
      const res = await db.getCurrentTid(date)
      if (res) {
        console.log("in service getTid = ", res)
        const ares = await db.getAllTid()
        console.log("in service all tid", ares)
        return res;
      } else {
        return { currentTid: 1 }
      }

    } else {
      console.log("in service error")
      return
    }
  } catch (err) {
    console.log("in service ", err)
  }
}