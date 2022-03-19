
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from "react";
import { Box, Grid, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { actions } from "../../actions/actions"
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const patientSchema = yup.object().shape({
  name: yup.string().required("Enter a valid Name"),
  address: yup.string().required("Enter a valid Address"),
  age: yup.number().required("Enter a valid age")
    .positive("Age should be greater than 0")
    .max(150, "Age should be less than 150 years").optional(),
  gender: yup.string().oneOf(['male', 'female'], "Gender should be male or female").required("Enter a valid Gender"),
  CurrentTemp: yup.number().min(0, "temperature should be greater than 0").max(150, "temperature should be less than 150").optional(),
  CurrentBp: yup.string().optional(),
  CurrentOxygen: yup.string().optional()
});
const PatientForm = ({ closeForm, setId }) => {
  const intialValues = {
    UId: "1",
    Tid: "1",
    name: "Daule",
    address: "Manpur Gaya",
    age: 23,
    gender: "Male",
    currentTemp: "99",
    currentBp: "70/90",
    currentOxygen: "20",
    dateOfAppoint: "12/03/22",
    dateOfBooking: "12/03/22"
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: intialValues,
    // {
    //   UId: "",
    //   Tid: "",
    //   name: "",
    //   address: "",
    //   age: "",
    //   gender: "",
    //   currentTemp: "",
    //   currentBp: "",
    //   currentOxygen: "",
    //   dateOfAppoint: "",
    //   dateOfBooking: ""
    // },
    validationSchema: patientSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values, " in forms")
      const res = await dispatch(actions.add(values))
      console.log("added ", res)
      if (res) {
        setId(res.PID)
        closeForm(false)
      }
    },
  });


  return (
    <Box mx={9}>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Grid item>Patient Form</Grid>
          <Grid item container direction='column' justifyContent='space-evenly' alignItems='center'>
            <Grid item>
              <TextField
                fullWidth
                id="name"
                name="name"
                style={{ width: "50ch" }}
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item>
              <TextField
                minRows={3}
                multiline
                fullWidth
                style={{ width: "50ch" }}
                id="address"
                name="address"
                label="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item container justifyContent='space-evenly' alignItems='center'>
              <Grid item>
                <TextField
                  fullWidth
                  id="age"
                  name="age"
                  label="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>
              {/* <Grid item>
                <TextField
                  fullWidth
                  id="gender"
                  name="gender"
                  label="gender"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                />
              </Grid> */}
              <Grid item p={2}>
                <TextField
                  id="gender"
                  fullWidth
                  name="gender"
                  select
                  label="Gender"
                  // style={{ paddingLeft: "18px", paddingRight: "18px" }}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  helperText={formik.touched.gender && formik.errors.gender}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <MenuItem value="male">
                    male
                  </MenuItem>
                  <MenuItem value="female">
                    female
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid item container justifyContent='space-evenly' alignItems='center'>
              <Grid item>
                <TextField
                  fullWidth
                  id="currentTemp"
                  name="currentTemp"
                  label="currentTemp"
                  value={formik.values.currentTemp}
                  onChange={formik.handleChange}
                  error={formik.touched.currentTemp && Boolean(formik.errors.currentTemp)}
                  helperText={formik.touched.currentTemp && formik.errors.currentTemp}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="currentBp"
                  name="currentBp"
                  label="currentBp"
                  value={formik.values.currentBp}
                  onChange={formik.handleChange}
                  error={formik.touched.currentBp && Boolean(formik.errors.currentBp)}
                  helperText={formik.touched.currentBp && formik.errors.currentBp}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="currentOxygen"
                  name="currentOxygen"
                  label="currentOxygen"
                  value={formik.values.currentOxygen}
                  onChange={formik.handleChange}
                  error={formik.touched.currentOxygen && Boolean(formik.errors.currentOxygen)}
                  helperText={formik.touched.currentOxygen && formik.errors.currentOxygen}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justifyContent='center' alignItems='center'>
            <Grid item>
              <Box mt={5}>
                <Button color="primary" variant="contained" fullWidth
                  type="submit"
                >
                  Add Appointment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};



export default PatientForm