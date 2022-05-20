import axios from "axios";

//for accurate real-time data. It updates more frequently on the day.
const covidWorldOMetersApi = axios.create({
  baseURL: "https://corona.lmao.ninja/v3/covid-19",
});

//for historical data, original API had data for last 3 days only.
const covidJHUApi = axios.create({
  baseURL: "https://disease.sh/v3/covid-19",
});

export const getCardsData = async (country) => {
  try {
    const { data } =
      country !== "all"
        ? await covidWorldOMetersApi.get(`/countries/${country}`)
        : await covidWorldOMetersApi.get("/all");

    return data;
  } catch (error) {}
};

export const getDailyDataTotals = async (country) => {
  try {
    if (country === "all") {
      const {
        data: { cases, deaths },
      } = await covidJHUApi.get(`/historical/${country}`);

      const dates = Object.keys(cases);
      const dailyCasesTotal = Object.values(cases);
      const dailyDeaths = Object.values(deaths);
      return { dates, dailyCasesTotal, dailyDeaths };
    }
    const {
      data: {
        timeline: { cases, deaths },
      },
    } = await covidJHUApi.get(`/historical/${country}`);

    const dates = Object.keys(cases);
    const dailyCasesTotal = Object.values(cases);
    const dailyDeaths = Object.values(deaths);
    return { dates, dailyCasesTotal, dailyDeaths };
  } catch (error) {}
};

export const getCountries = async () => {
  try {
    const { data } = await covidWorldOMetersApi.get("/countries");
    const countriesList = [];
    data.forEach((countryData) => {
      if (countriesList.indexOf(countryData.country) === -1)
        countriesList.push(countryData.country);
    });
    return countriesList;
  } catch (error) {}
};
