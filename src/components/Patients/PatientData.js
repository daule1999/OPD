import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button, Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  titleBold: {
    fontSize: 18,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Title = ({ title, value }) => {
  const classes = useStyles();
  return <Grid item container justifyContent='space-between' alignItems='center'>
    <Grid item>
      <Typography variant="subtitle1" component="h2">
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <Typography className={classes.titleBold} color="textPrimary" gutterBottom>
        {value}
      </Typography>
    </Grid>
  </Grid>
}
const SubTitle = ({ title, value }) => {
  const classes = useStyles();
  return <Grid item container justifyContent='space-between' alignItems='center' >
    <Grid item>
      <Typography variant="subtitle2" component="h2">
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {value}
      </Typography>
    </Grid>
  </Grid>
}
export default function PatientData({ patient, setPrint }) {
  const classes = useStyles();
  // const [finalData, setfinalData] = useState([{}])
  console.log(patient)
  const doPrint = () => {
    const finalData = [{
      type: 'text',
      value: 'ANGELINA LIFE CARE HOSPITAL',
      style: `text-align:center;`,
      css: { "font-weight": "700", "font-size": "18px" }
    }, {
      type: 'text',
      value: 'Mofassil Mod, Khizarsarai Road',
      style: `text-align:center;`,
      css: { "font-weight": "500", "font-size": "14px" }
    }, {
      type: 'text',
      value: 'In front of vishal Petrol Pump',
      style: `text-align:center;`,
      css: { "font-weight": "500", "font-size": "14px" }
    }, {
      type: 'text',
      value: 'Mob no - 9472643340',
      style: `text-align:center;`,
      css: { "font-weight": "500", "font-size": "16px" }
    }, {
      type: 'text',
      value: 'OPD Slip',
      style: `text-align:center;`,
      css: { "font-weight": "600", "font-size": "16px" }
    }, , {
      type: 'table',
      style: 'border: 1px solid #ddd',
      tableBody: [
        [{ type: 'text', value: "Doctor Name" }, { type: 'text', value: "Dr. Angelina" }],
        [{ type: 'text', value: "Patient Name" }, { type: 'text', value: patient.Name }],
        [{ type: 'text', value: `Uid :  ${patient.UId}` }, { type: 'text', valu: ` Uid : patient.Tid` }],
        [{ type: 'text', value: "Address" }, { type: 'text', value: patient.Address }],
        [{ type: 'text', value: "Age" }, { type: 'text', value: patient.Age }],
        [{ type: 'text', value: "Gender" }, { type: 'text', value: patient.sex }],
        [{ type: 'text', value: "Temp." }, { type: 'text', value: patient.CurrentTemp }],
        [{ type: 'text', value: "BP" }, { type: 'text', value: patient.CurrentBp }],
        [{ type: 'text', value: "Oxygen" }, { type: 'text', value: patient.CurrentOxygen }],
        [{
          type: 'text', value: `dateOfAppoint :  ${patient.dateOfAppoint}`
        }, {
          type: 'text', value: `dateOfBooking :  ${patient.dateOfBooking}`
        }],
        [{ type: 'text', value: "Fee" }, { type: 'text', value: "200 Rs" }],
      ],
      tableHeaderStyle: 'background-color: #000; color: white;',
      tableBodyStyle: 'border: 0.5px solid #ddd',
      tableFooterStyle: 'background-color: #000; color: white;',
    }]
    setPrint(finalData)
  }

  console.log(patient, "patient in data")
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box px={5}>
          <Grid container>
            <SubTitle title="Patient Id" value={patient.Pid} />
            <Title title="Token No" value={patient.TId} />
            <Title title="Name" value={patient.Name} />
            <SubTitle title="Age" value={patient.Age} />
            <SubTitle title="Gender" value={patient.gender} />
            <SubTitle title="Address" value={patient.Address} />
            <SubTitle title="Temperature" value={patient.CurrentTemp} />
            <SubTitle title="BP" value={patient.CurrentBp} />
            <SubTitle title="Oxygen" value={patient.CurrentOxygen} />
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={doPrint}>Print</Button>
      </CardActions>
    </Card>
  );
}
