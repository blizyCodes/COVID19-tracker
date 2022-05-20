import React from "react";
import { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import styles from "./Cards.module.css";
import { getCardsData } from "../../utils/api";
import { SingleCard } from "./SingleCard";

const Cards = ({ chosenCountry }) => {
  const [totalData, setTotalData] = useState({});
  useEffect(() => {
    const getTotal = async () => {
      const data = await getCardsData(chosenCountry);

      setTotalData(data);
    };

    getTotal();
  }, [chosenCountry]);

  return totalData.cases ? (
    <div className={styles.container}>
      <Typography pb={2} variant="h4" component="h2" gutterBottom>
        {chosenCountry !== "all" ? chosenCountry : "All Countries"}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <SingleCard
          title="Infected"
          subtitle="Number of COVID-19 cases"
          lastUpdate={totalData.updated}
          className={styles.infected}
          endValue={totalData.cases}
        />
        <SingleCard
          title="Casualties"
          subtitle="Number of deaths from COVID 19"
          lastUpdate={totalData.updated}
          className={styles.deaths}
          endValue={totalData.deaths}
        />
        <SingleCard
          title="Recovered"
          subtitle="Number of recoveries from COVID-19 (if reported)"
          lastUpdate={totalData.updated}
          className={styles.recovered}
          endValue={totalData.recovered}
        />
      </Grid>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Cards;
