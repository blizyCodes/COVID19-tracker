import React from "react";
import { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import styles from "./Cards.module.css";
import { getDailyDataTotals } from "../../utils/api";
import { SingleCard } from "./SingleCard";

const Cards = ({ chosenCountry }) => {
  const [totalData, setTotalData] = useState({});
  const [recovered, setRecovered] = useState(0);
  useEffect(() => {
    const getTotal = async () => {
      const data = await getDailyDataTotals(chosenCountry);
      setTotalData(data);
      setRecovered(data.recoveredTotal);
      // const recoveredData = await getRecoveredData(chosenCountry);
      // setRecovered(recoveredData.recovered);
    };

    getTotal();
  }, [chosenCountry]);

  return totalData.lastDailyCasesTotal ? (
    <div className={styles.container}>
      <Typography pb={2} variant="h4" component="h2" gutterBottom>
        {chosenCountry !== "all" ? chosenCountry : "All Countries"}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <SingleCard
          title="Infected"
          subtitle="Number of COVID-19 cases"
          lastUpdate={totalData.lastUpdated}
          className={styles.infected}
          endValue={totalData.lastDailyCasesTotal}
        />
        <SingleCard
          title="Casualties"
          subtitle="Number of deaths from COVID 19"
          lastUpdate={totalData.lastUpdated}
          className={styles.deaths}
          endValue={totalData.lastDailyDeathsTotal}
        />
        <SingleCard
          title="Recovered"
          subtitle="Number of recoveries from COVID-19 (if reported)"
          lastUpdate={totalData.lastUpdated}
          className={styles.recovered}
          endValue={recovered}
        />
      </Grid>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Cards;
