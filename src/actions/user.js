// import {
//   DELETE_FAILURE,
//   DELETE_REQUEST,
//   DELETE_SUCCESS,
//   GETALL_FAILURE,
//   GETALL_REQUEST,
//   GETALL_SUCCESS,
//   LOGIN_FAILURE,
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGOUT,
//   REGISTER_FAILURE,
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
// } from "../actionConstants/actionConstants"

// import { alertActions } from "./alert"
// // import { history } from "./history";
// import { userService } from "../services/userService";

// // import { useHistory } from "react-router-dom";

// function login(username, password, from) {
//   return (dispatch) => {
//     dispatch(request({ username }));

//     userService.login(username, password).then(
//       (user) => {
//         if (!user) {
//           const msg = "Username or Password Does not Match";
//           dispatch(failure(msg));
//           dispatch(alertActions.error(msg));
//         } else {
//           console.log(user);
//           console.log(
//             "Authenticated from user.js user => " + JSON.stringify(user)
//           );
//           dispatch(success(user));
//           dispatch(alertActions.success("Logged in Succesfully"));
//           //   history.push(from);
//           console.log(`history.push("/");`);
//           // history.replace("/");
//         }
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(user) {
//     return { type: LOGIN_REQUEST, user };
//   }
//   function success(user) {
//     return { type: LOGIN_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: LOGIN_FAILURE, error };
//   }
// }

// function logout() {
//   return (dispatch) => {
//     dispatch(alertActions.clear())
//     userService.logout().then((res) => {
//       console.log(`Logged out result => ` + res)
//       if (res === "logout") {
//         dispatch(logOutUser())
//         dispatch(alertActions.success("Loggout Successfully.."))
//       } else {
//         dispatch(alertActions.error("Loggout Failed.."))
//       }

//     })
//   }
//   function logOutUser() {
//     return { type: LOGOUT };
//   }


// }

// function register(user) {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.register(user).then(
//       (res) => {
//         console.log("on user.js " + res)
//         if (res === "Registered") {
//           dispatch(success());
//           // history.push("/login");
//           dispatch(alertActions.success("Registration successful"));
//           dispatch(login(user.username, user.password))
//         } else if (res === "Already Registered") (
//           dispatch(alertActions.error("Already Registered"))
//         )
//         else {
//           dispatch(failure("Registration Failed"));
//           dispatch(alertActions.error("UserName Already taken"));
//         }
//         // dispatch(success());
//         // history.push("/login");
//         // dispatch(alertActions.success("Registration successful"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(user) {
//     return { type: REGISTER_REQUEST, user };
//   }
//   function success(user) {
//     return { type: REGISTER_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: REGISTER_FAILURE, error };
//   }
// }

// function getAll() {
//   return (dispatch) => {
//     dispatch(request());

//     userService.getAll().then(
//       (users) => dispatch(success(users)),
//       (error) => dispatch(failure(error.toString()))
//     );
//   };

//   function request() {
//     return { type: GETALL_REQUEST };
//   }
//   function success(users) {
//     return { type: GETALL_SUCCESS, users };
//   }
//   function failure(error) {
//     return { type: GETALL_FAILURE, error };
//   }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return (dispatch) => {
//     dispatch(request(id));

//     userService.delete(id).then(
//       (user) => dispatch(success(id)),
//       (error) => dispatch(failure(id, error.toString()))
//     );
//   };

//   function request(id) {
//     return { type: DELETE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: DELETE_SUCCESS, id };
//   }
//   function failure(id, error) {
//     return { type: DELETE_FAILURE, id, error };
//   }
// }

// export const userActions = {
//   login,
//   logout,
//   register,
//   getAll,
//   delete: _delete,
// };
