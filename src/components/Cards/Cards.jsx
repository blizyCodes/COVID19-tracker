import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import { getTotalData } from "../../utils/api";

const Cards = () => {
  const [confirmedTotal, setConfirmedTotal] = useState(null);
  const [recoveredTotal, setrecoveredTotal] = useState(null);
  const [deathsTotal, setdeathsTotal] = useState(null);
  const [lastUpdateTotal, setlastUpdateTotal] = useState(null);

  useEffect(() => {
    const getTotal = async () => {
      const { confirmed, recovered, deaths, lastUpdate } = await getTotalData();

      setConfirmedTotal(confirmed);
      setrecoveredTotal(recovered);
      setdeathsTotal(deaths);
      setlastUpdateTotal(lastUpdate);
    };

    getTotal();
  }, []);

  return confirmedTotal ? (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infections
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmedTotal.value}
                duration={1.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdateTotal).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered patients
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={recoveredTotal.value}
                duration={1.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdateTotal).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of successful recoveries from COVID19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Casualties
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={deathsTotal.value}
                duration={1.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdateTotal).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of deaths caused by COVID19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Cards;
