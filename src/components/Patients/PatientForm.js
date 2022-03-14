
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from "react";

const signInSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),

  password: yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
});
const PatientForm = () => {
  const intialValues = {
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
  };

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};



export default PatientForm