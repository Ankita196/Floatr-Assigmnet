import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root1: {
    marginLeft: 550,
    marginTop: 50,
  },

  field: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    width: 200,
    backgroundColor: '#ffe0b2',
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    width: 200,
    backgroundColor: '#e0f2f1',
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    width: 460,
    backgroundColor: '#b2ebf2',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a237e',
    padding: 10,
    marginLeft: 50,
  },
  subheading: {
    fontSize: 20,
    padding: 20,
    width: 150,
  },
  button: {
    marginLeft: 140,
    width: 250,
  },
  subheading1: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
}));

export default function Calculators() {
  const classes = useStyles();
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    months: '',
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    EmiPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  const isValid = () => {
    const { amount, interest, months } = userValues;
    let actualError = '';
   
    // Validate if there are values
    if (!amount || !interest || !months) {
      actualError = 'All the values are required';
    }
 if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  // Calculation
  const calculateResults = ({ amount, interest, months }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(months) ;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const EmiPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        EmiPayment: EmiPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      months: '',
    });

    setResults({
      EmiPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };
  return (
    <>
      <div className={classes.root1}>
        <Typography className={classes.heading}>
          {' '}
          Loan EMI Calculator
        </Typography>

        <form onSubmit={handleSubmitValues}>
          <div>
            <div className={classes.field}>
              <Typography className={classes.subheading}>
                Loan Amount
              </Typography>{' '}
              <TextField
                label="Enter amount"
                variant="outlined"
                type="number"
                name="amount"
                value={userValues.amount}
                // onChange method sets the values given by the user as input to the userValues state
                onChange={handleInputChange}
              />
              <Typography className={classes.subheading}>INR</Typography>{' '}
            </div>
            <div className={classes.field}>
              <Typography className={classes.subheading}>
                Loan Tenure
              </Typography>
              <TextField
                label="Enter months"
                variant="outlined"
                value={userValues.months}
                type="number"
                name="months"
                onChange={handleInputChange}
              />
              <Typography className={classes.subheading}>months</Typography>{' '}
            </div>
            <div className={classes.field}>
              <Typography className={classes.subheading}>
                Intrest Rate
              </Typography>{' '}
              <TextField
                label="NN.NN"
                variant="outlined"
                type="number"
                name="interest"
                value={userValues.interest}
                onChange={handleInputChange}
              />{' '}
              <Typography className={classes.subheading}>%</Typography>
            </div>{' '}
          </div>
          <Typography className={classes.error}>{error}</Typography>
          {!results.isResult ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Calculate
              </Button>{' '}
            </div>
          ) : (
            <div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={clearFields}
                  className={classes.button}
                >
                  Reset
                </Button>
              </div>

              <Typography className={classes.heading}>
                Loan EMI Calculator
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Paper className={[classes.paper, classes.subheading1]}>
                    Loan EMI <br /> <br /> Rs.{results.EmiPayment}
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={[classes.paper2, classes.subheading1]}>
                    Total Interest Payable <br /> <br /> Rs.{' '}
                    {results.totalInterest}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={[classes.paper1, classes.subheading1]}>
                    Total Payment:
                    <br /> <br />
                    {results.totalPayment}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
