import axios from "axios";

const api = "https://disease.sh/v3/covid-19"

export const getDailyDataTotals = async (country) => {
  let casesData;
  let deathsData;
  let recoveredData;

  if (country === "all") {
    const [ {data: { cases, deaths }}, {data: { recovered }} ] = await Promise.all([
      axios.get(`${api}/historical/all`),
      axios.get(`${api}/all`),
    ]);

    casesData = cases;
    deathsData = deaths;
    recoveredData = recovered;

  } else {

    const [{data: {timeline: { cases, deaths }}},{data: { recovered }},
    ] = await Promise.all([
      axios.get(`${api}/historical/${country}`),
      axios.get(`${api}/countries/${country}`),
    ]);

    casesData = cases;
    deathsData = deaths;
    recoveredData = recovered;
  }

  const dates = Object.keys(casesData);
  const lastUpdated = dates[dates.length - 1];
  const dailyCasesTotal = Object.values(casesData);
  const lastDailyCasesTotal = dailyCasesTotal[dailyCasesTotal.length - 1];
  const dailyDeathsTotal = Object.values(deathsData);
  const lastDailyDeathsTotal = dailyDeathsTotal[dailyDeathsTotal.length - 1];

  return { dates, lastUpdated, dailyCasesTotal, lastDailyCasesTotal, dailyDeathsTotal, lastDailyDeathsTotal, recoveredData};
};

export const getCountries = async () => {
  const { data } = await axios.get(`${api}/jhucsse`);
  const countriesList = [];
  data.forEach((countryData) => {
    if (countriesList.indexOf(countryData.country) === -1)
      countriesList.push(countryData.country);
  });
  return countriesList;
};