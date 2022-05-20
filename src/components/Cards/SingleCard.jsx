import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./SingleCard.module.css";

export const SingleCard = ({
  title,
  subtitle,
  lastUpdate,
  className,
  endValue,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={3}
      component={Card}
      className={cx(styles.card, className)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          <CountUp start={0} end={endValue} duration={1.5} separator="," />
        </Typography>
        <Typography color="textSecondary">
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          {subtitle}
        </Typography>
      </CardContent>
    </Grid>
  );
};
