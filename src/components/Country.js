import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { getCountryData } from "./CountryApi";
import { NativeSelect, FormControl } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import CountUp from "react-countup";
import UpdateIcon from "@material-ui/icons/Update";
import { Typography, Grid } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

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
  chartCon: {
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
  picker: {
    // width: "100%",
    textAlign: "center",
    margin: "20px 0",
  },
}));

const Country = () => {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await fetch("https://covid19.mathdro.id/api/countries");
      let data = await response.json();

      const { countries } = data;
      const countryList = countries.map((cntry) => cntry.name);
      setCountryData(countryList);
    }
    getData();
  }, [setCountryData]);

  const handleCountryChange = async (event) => {
    const data = await getCountryData(event.target.value);
    setSelectedCountry(data);
  };

  const classes = useStyles();
  const { confirmed, deaths, recovered, LastUpdated } = selectedCountry;
  //   console.log(deaths);
  const timeString = moment(LastUpdated).fromNow();
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Deaths", "Recovered"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["orange", "red", "green"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State In ${selectedCountry}` },
      }}
    />
  ) : null;

  if (!confirmed) {
    return (
      <>
        <div className={classes.picker}>
          <FormControl>
            <NativeSelect
              defaultValue=""
              onChange={(e) => handleCountryChange(e)}
            >
              <option>Select Country</option>
              {countryData.map((cntry, i) => (
                <option value={cntry} key={i}>
                  {cntry}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <div className={classes.load}>
          <CircularProgress />
        </div>
      </>
    );
  }
  return (
    <>
      <div className={classes.picker}>
        <FormControl>
          <NativeSelect
            defaultValue=""
            onChange={(e) => handleCountryChange(e)}
          >
            <option>Select Country</option>
            {countryData.map((cntry, i) => (
              <option value={cntry} key={i}>
                {cntry}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
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
              <CountUp
                start={0}
                end={confirmed.value}
                duration={3}
                separator=","
              />
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
              <CountUp
                start={0}
                end={deaths.value}
                duration={3}
                separator=","
              />
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
              <CountUp
                start={0}
                end={recovered.value}
                duration={3}
                separator=","
              />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.lastUpdate}>
        <UpdateIcon fontSize="small" /> Last Update {timeString}
        {/* {new Date(parseInt(updated, 10)).toString("MM/dd/yy HH:mm:ss")} */}
      </div>
      <div className={classes.chartCon}>{barChart}</div>
    </>
  );
};

export default Country;
