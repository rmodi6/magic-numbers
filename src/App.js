import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "grid",
    justifyItems: "center",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function Welcome(props) {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Choose a number between 1 and 63
      </Typography>
    </React.Fragment>
  );
}

function Questions(props) {
  const index = Math.pow(2, props.index);
  const numList = props.numbers.filter(i => (i & index) === index);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Is your number present in the following list?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {numList.join(", ")}
      </Typography>
    </React.Fragment>
  );
}

function Answer(props) {
  const answer = parseInt(props.answers.current.reverse().join(''), 2);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Your number is:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {answer}
      </Typography>
    </React.Fragment>
  );
}

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const answers = React.useRef(Array(6).fill(0));
  const steps = Array(8).fill();

  const numbers = Array(64).fill().map((_, i) => i).filter(i => i > 0);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Welcome />;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return <Questions numbers={numbers} index={stepIndex - 1} />
      case 7:
        return <Answer answers={answers} />
      default:
        return 'Unknown stepIndex';
    }
  }

  const handleNext = (val) => {
    if (val !== -1) {
      answers.current[activeStep - 1] = val;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let buttons = null;
  if (activeStep === steps.length - 1) {
    buttons = (
      <div>
        <Button variant="contained" color="primary" onClick={handleReset}>Again</Button>
      </div>
    );
  } else if (activeStep === 0) {
    buttons = (
      <div>
        <Button variant="contained" color="primary" onClick={() => handleNext(-1)}>Done</Button>
      </div>
    );
  } else {
    buttons = (
      <div>
        <div>
          <Button variant="contained" color="primary" onClick={() => handleNext(1)} className={classes.backButton}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleNext(0)}>
            No
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Grid
      container
      display="grid"
      spacing={4}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid 
        item
        className={classes.gridItem}
      >
        {getStepContent(activeStep)}
      </Grid>
      <Grid item>
        {buttons}
      </Grid>
    </Grid>
  );
}
