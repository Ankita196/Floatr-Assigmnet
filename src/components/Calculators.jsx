import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root1: {
    marginLeft:600,
    marginTop:100
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
  },
}));

export default function Calculators() {
  const classes = useStyles();
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
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
    const { amount, interest, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = 'All the values must be a positive number';
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
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
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
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };
  return (
    <>
      <div className={classes.root1}>
        <Typography>Loan EMI Calculator</Typography>

        <form onSubmit={handleSubmitValues}>
          {!results.isResult ? (
            <div>
              <div className={classes.field}>
                <Typography>Loan Amount</Typography>{' '}
                <TextField
                  label="Enter amount"
                  variant="outlined"
                  type="text"
                  name="amount"
                  value={userValues.amount}
                  // onChange method sets the values given by the user as input to the userValues state
                  onChange={handleInputChange}
                />
                <Typography>INR</Typography>{' '}
              </div>
              <div className={classes.field}>
                <Typography>Loan Tenure</Typography>
                <TextField
                  label="Enter months"
                  variant="outlined"
                  value={userValues.years}
                  type="text"
                  name="years"
                  onChange={handleInputChange}
                />
                <Typography>months</Typography>{' '}
              </div>
              <div className={classes.field}>
                <Typography>Intrest Rate</Typography>{' '}
                <TextField
                  label="NN.NN"
                  variant="outlined"
                  type="text"
                  name="interest"
                  value={userValues.interest}
                  onChange={handleInputChange}
                />{' '}
                <Typography>%</Typography>
              </div>
              <Typography>{error}</Typography>
              <Button variant="contained" color="primary" type="submit">
                Calculate
              </Button>{' '}
            </div>
          ) : (
            <div>
               <div>
              <div className={classes.field}>
                <Typography>Loan Amount</Typography>{' '}
                <TextField
                  label="Enter amount"
                  variant="outlined"
                  type="text"
                  name="amount"
                  value={userValues.amount}
                  // onChange method sets the values given by the user as input to the userValues state
                  onChange={handleInputChange}
                />
                <Typography>INR</Typography>{' '}
              </div>
              <div className={classes.field}>
                <Typography>Loan Tenure</Typography>
                <TextField
                  label="Enter months"
                  variant="outlined"
                  value={userValues.years}
                  type="text"
                  name="years"
                  onChange={handleInputChange}
                />
                <Typography>months</Typography>{' '}
              </div>
              <div className={classes.field}>
                <Typography>Intrest Rate</Typography>{' '}
                <TextField
                  label="NN.NN"
                  variant="outlined"
                  type="text"
                  name="interest"
                  value={userValues.interest}
                  onChange={handleInputChange}
                />{' '}
                <Typography>%</Typography>
              </div>
              <Typography>{error}</Typography>
              <Button variant="contained" color="primary" onClick={clearFields}>
                Reset
              </Button>

            </div>
             
              <Typography>Loan EMI Calculator</Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    Loan EMI <br /> Rs.{results.monthlyPayment}
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    Total Interest Payable <br /> Rs. {results.totalInterest}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    Total Payment:
                    <br />
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
