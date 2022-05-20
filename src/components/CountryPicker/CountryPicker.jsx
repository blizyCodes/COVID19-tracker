import React from "react";
import { NativeSelect, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./CountryPicker.module.css";
import { getCountries } from "../../utils/api";

const CountryPicker = ({ setChosenCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesList = async () => {
      const countriesList = await getCountries();
      setCountries(countriesList);
    };
    getCountriesList();
  }, []);

  const handleChosenCountryChange = async (country) => {
    setChosenCountry(country);
  };

  return countries ? (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(event) => handleChosenCountryChange(event.target.value)}
      >
        <option value="all">All</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  ) : (
    <h2>loading</h2>
  );
};

export default CountryPicker;
