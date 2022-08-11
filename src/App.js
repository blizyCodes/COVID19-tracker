import React from "react";
import { CardsList, Charts, CountryPicker } from "./components";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { getDailyDataTotals } from "./utils/api";
import banner from "./utils/covid-banner.jpg";

function App() {
  const [dates, setDates] = useState([]);
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [chosenCountry, setChosenCountry] = useState("all");

  useEffect(() => {
    const getDailyForChart = async () => {
      const { dates, dailyCasesTotal, dailyDeathsTotal } =
        await getDailyDataTotals(chosenCountry);
      setDates(dates);
      setCases(dailyCasesTotal);
      setDeaths(dailyDeathsTotal);
    };
    getDailyForChart();
  }, [chosenCountry]);

  return (
    <div className={styles.container}>
      <img src={banner} className={styles.image} alt="covid-19" />
      <CardsList chosenCountry={chosenCountry} />
      <CountryPicker setChosenCountry={setChosenCountry} />
      <Charts dates={dates} cases={cases} deaths={deaths} />
      <p className={styles.ownership}>
        Created by donblizy - <a href="https://github.com/donblizy">GitHub</a>{" "}
      </p>
    </div>
  );
}

export default App;
