import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  mainChart: {
    maxWidth: "1000px",
    margin: "20px auto",
  },
}));
const Chart = () => {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("https://covid19.mathdro.id/api/daily");
      //   let { cases, deaths, recovered } = await response.json();

      let data = await response.json();
      setDailyData(data);
    }
    getData();
  }, []);
  const LineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ reportDate }) => reportDate),
          datasets: [
            {
              data: dailyData.map(({ totalConfirmed }) => totalConfirmed),
              label: "infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths: { total } }) => total),
              label: "deaths",
              borderColor: "#red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  return <div className={classes.mainChart}>{LineChart}</div>;
};

export default Chart;
