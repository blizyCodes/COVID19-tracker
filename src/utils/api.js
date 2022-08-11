import axios from "axios";

const covidJHUApi = axios.create({
  baseURL: "https://disease.sh/v3/covid-19",
});

export const getDailyDataTotals = async (country) => {
  if (country === "all") {
    const [
      {
        data: { cases, deaths },
      },
      {
        data: { recovered: recoveredTotal },
      },
    ] = await Promise.all([
      covidJHUApi.get(`/historical/${country}`),
      covidJHUApi.get(`/${country}`),
    ]);

    const dates = Object.keys(cases);
    const lastUpdated = dates[dates.length - 1];
    const dailyCasesTotal = Object.values(cases);
    const lastDailyCasesTotal = dailyCasesTotal[dailyCasesTotal.length - 1];
    const dailyDeathsTotal = Object.values(deaths);
    const lastDailyDeathsTotal = dailyDeathsTotal[dailyDeathsTotal.length - 1];
    return {
      dates,
      lastUpdated,
      dailyCasesTotal,
      lastDailyCasesTotal,
      dailyDeathsTotal,
      lastDailyDeathsTotal,
      recoveredTotal,
    };
  }

  const {
    data: {
      timeline: { cases, deaths },
    },
  } = await covidJHUApi.get(`/historical/${country}`);

  const dates = Object.keys(cases);
  const lastUpdated = dates[dates.length - 1];
  const dailyCasesTotal = Object.values(cases);
  const lastDailyCasesTotal = dailyCasesTotal[dailyCasesTotal.length - 1];
  const dailyDeathsTotal = Object.values(deaths);
  const lastDailyDeathsTotal = dailyDeathsTotal[dailyDeathsTotal.length - 1];
  return {
    dates,
    lastUpdated,
    dailyCasesTotal,
    lastDailyCasesTotal,
    dailyDeathsTotal,
    lastDailyDeathsTotal,
  };
};

export const getCountries = async () => {
  const { data } = await covidJHUApi.get("/jhucsse");
  const countriesList = [];
  data.forEach((countryData) => {
    if (countriesList.indexOf(countryData.country) === -1)
      countriesList.push(countryData.country);
  });
  return countriesList;
};
