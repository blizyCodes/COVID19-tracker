import axios from "axios";

const covidApi = axios.create({
  baseURL: "https://covid19.mathdro.id/api",
});

export const getTotalData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await covidApi.get("/");
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};
