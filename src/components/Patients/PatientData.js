import React from 'react';
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
        <Button size="small" onClick={() => setPrint(patient)}>Print</Button>
      </CardActions>
    </Card>
  );
}
