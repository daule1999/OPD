import * as Yup from "yup";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import { setUser } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom"
import { alertActions } from "../../actions/alert";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { userActions } from "../../actions/user"

const phoneRegExp = /^[6789]\d{9}$/
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const alert = useSelector((state) => state.alert);
  const [messge, setmsg] = useState("");
  // const [showpass,setShowPass]=useState(false);
  // const handleClickShowPassword = () => {
  //   setShowPass(!showpass);
  //   // setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
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
      fullName: '',
      userName: '',
      email: '',
      password: '',
      cpassword: '',
      mobile: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(5, "Must be at least 5 characters")
        .required("Required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is a required field"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum."),
      // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
      // .matches(
      //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      // ),
      cpassword: Yup.string()
        .required("Please confirm your password")
        .when("password", {
          is: (password) => (password && password.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password doesn't match"
          ),
        }),
      mobile: Yup.string()
        .required("required")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "must be 10 digits")
        .max(10, "must be 10 digits")
    }),
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values));
      const newUser = {
        fullname: values.fullName,
        username: values.userName,
        email: values.email,
        password: values.password,
        mobile: values.mobile
      }
      console.log(JSON.stringify(newUser));
      dispatch(userActions.register(newUser))
      history.push("/");
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.type}>
            {messge}
          </Alert>
        </Snackbar>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fullName"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
            </Grid>
            {formik.touched.fullName && formik.errors.fullName ? (
              <div>{formik.errors.fullName}</div>
            ) : null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
            </Grid>
            {formik.touched.userName && formik.errors.userName ? (
              <div>{formik.errors.userName}</div>
            ) : null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </Grid>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
              />
            </Grid>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cpassword}
              />
            </Grid>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="mobile"
                label="Mobile Number"
                type="number"
                id="mobile"
                autoComplete="mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
            </Grid>
            {formik.touched.mobile && formik.errors.mobile ? (
              <div>{formik.errors.mobile}</div>
            ) : null}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/LogIn">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;