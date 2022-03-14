import * as Yup from "yup";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography, IconButton, InputAdornment, Link, Alert
} from "@mui/material";
import { Redirect, useLocation } from "react-router-dom";
// import { setUser } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  NavLink,
} from "react-router-dom";
import React from "react";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { alertActions } from "../../actions/alert";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
// import { useEffect } from 'react';
import { useFormik } from "formik";
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userActions } from "../../actions/user";

///store/actions/user.js
function Alertt(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LogIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // let history = useHistory();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.authentication.loggingIn);
  const alert = useSelector((state) => state.alert);
  const [messge, setmsg] = useState("");
  const [showpass, setShowPass] = useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showpass);
    // setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (alert.type === 'no_alert') {
      setOpen(false);
    }
    else if (alert.type === 'success') {
      setOpen(true);
      setmsg(alert.message)
      console.log(alert.message + " => " + messge)
    } else if (alert.type === 'error') {
      setOpen(true);
      setmsg(alert.message)
      console.log(alert.message + " => " + messge)
    } else {
      setOpen(false);
    }

  }, [alert, messge]);

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    dispatch(alertActions.clear())
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum."),
      // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    }),
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values));
      // dispatch(setUser(values))
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(values.username, values.password, from));
      // history.push("/");
    },
  });
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alertt onClose={handleClose} severity={alert.type}>
            {messge}
          </Alertt>
        </Snackbar>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          /> */}
          <FormControl
            // className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            margin="normal"
            fullWidth
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showpass ? "text" : "password"}
              required
              fullWidth
              name="password"
              label="Password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showpass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to="/SignUp">
                {/* <Link href="#" variant="body2"> */}
                {"Don't have an account? Sign Up"}
                {/* </Link> */}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default LogIn;