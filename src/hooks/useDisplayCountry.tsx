// import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataFileContext } from "../context/DataContext";

const useDisplayCountry = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countryBorders, setCountryBorders] = useState<string[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { countriesData } = useContext(DataFileContext);

  const { countryName } = useParams();

  const handleSelectBorder = (border: string) => {
    navigate(`/${border}`);
  };

  useEffect(() => {
    if (countryName) {
      setError("");
      setCountryBorders([]);
    } else {
      setError("Record not available!!");
    }
  }, [countryName]);

  const filterCountries = countriesData.filter(
    (country) => country.name === countryName
  );

  useEffect(() => {
    if (filterCountries.length > 0) {
      //Load the Border Countries
      const arrCountryBorders = filterCountries[0].borders || [];

      for (let i = 0; i < arrCountryBorders.length; i++) {
        let borderName = countriesData.filter(
          (country) => country.alpha3Code === arrCountryBorders[i]
        )[0].name;

        if (!countryBorders.includes(borderName) && borderName) {
          setCountryBorders((prev) => [...prev, borderName]);
        }
      }
    }
  }, [countryBorders, countriesData, filterCountries]);

  return {
    isLoading,
    setIsLoading,
    handleSelectBorder,
    filterCountries,
    error,
    countryBorders,
  };
};

export default useDisplayCountry;
