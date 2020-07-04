import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Chart from "./Chart";
import CircularProgress from "@material-ui/core/CircularProgress";
import CountUp from "react-countup";
import UpdateIcon from "@material-ui/icons/Update";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: "30px",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  container: {
    boxSizing: "borderBox",
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  load: {
    marginLeft: "50%",
    marginTop: "50px",
  },
  paper: {
    // boxSizing: "border-box",

    paddingTop: "20px",
    textAlign: "center",
  },
  lastUpdate: {
    fontSize: "1rem",
    textAlign: "center",
  },
}));

const Cards = () => {
  const [globalData, setGlobalData] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      //   let { cases, deaths, recovered } = await response.json();
      let data = await response.json();
      setGlobalData(data);
    }
    getData();
  }, []);
  const classes = useStyles();
  const { cases, deaths, recovered, updated } = globalData;
  const timeString = moment(updated).fromNow();
  if (!cases) {
    return (
      <div className={classes.load}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm>
          <Paper
            className={classes.paper}
            style={{ borderBottom: "5px solid orange", color: "orange" }}
          >
            <Typography variant="h5" gutterBottom>
              Cases
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={cases} duration={3} separator="," />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm>
          <Paper
            className={classes.paper}
            style={{ borderBottom: "5px solid red", color: "red" }}
          >
            <Typography variant="h5" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={deaths} duration={3} separator="," />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm>
          <Paper
            className={classes.paper}
            style={{ borderBottom: "5px solid green", color: "green" }}
          >
            <Typography variant="h5" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={recovered} duration={3} separator="," />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.lastUpdate}>
        <UpdateIcon fontSize="small" /> Last Update {timeString}
        {/* {new Date(parseInt(updated, 10)).toString("MM/dd/yy HH:mm:ss")} */}
      </div>
      <Chart />
    </>
  );
};

export default Cards;
