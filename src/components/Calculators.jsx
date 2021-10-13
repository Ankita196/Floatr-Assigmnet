import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({

  root1 :{
paddingLeft:"auto",
paddingRight:"auto"
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    display:"flex",
    flexDirection:"column"
  },
}));

export default function Calculators() {
  const classes = useStyles();

  return (
    <div className={classes.root1}>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField  label="Enter amount" variant="outlined"/>
      <TextField  label="Enter months" variant="outlined" />
      <TextField  label="NN.NN" variant="outlined" />
    </form>
    </div>
  );
}
