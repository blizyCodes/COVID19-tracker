import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import styles from "./Charts.module.css";

const Charts = ({ dates, cases, deaths }) => {
  const lineChartCases = dates ? (
    <Line
      data={{
        labels: dates.map((date) =>
          new Date(date).toLocaleDateString("en-UK", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })
        ),
        datasets: [
          {
            data: cases.map((cases) => cases),
            label: "Infections",
            borderColor: "#3333ff",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const lineChartDeaths = dates ? (
    <Line
      id="deathsChart"
      data={{
        labels: dates.map((date) =>
          new Date(date).toLocaleDateString("en-UK", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })
        ),
        datasets: [
          {
            data: deaths.map((deaths) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      {lineChartCases}
      {lineChartDeaths}
    </div>
  );
};

export default Charts;
