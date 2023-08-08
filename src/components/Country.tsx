import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataFileContext } from "../context/DataContext";
import "./country.css";

const Country = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countryBorders, setCountryBorders] = useState<string[]>([]);
  const [error, setError] = useState("");

  const { countriesData } = useContext(DataFileContext);

  const { countryName } = useParams();

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

  return (
    <>
      {!isLoading && (
        <Link to="/" className="backbtn">
          &larr; Back
        </Link>
      )}

      {isLoading && <p className="LoadMessage">Loading......</p>}
      {/* {!error&&filterCountries.length===0&&!isLoading&&<p className='LogMsg'>{'No Record Found .....!!! '}</p>} */}
      {isLoading && filterCountries.length > 0 ? setIsLoading(false) : error}
      <div className="mainCountryContainer">
        {!error && (
          <section className="countryHeadSection">
            {filterCountries &&
              filterCountries.map((item) => {
                const nameOfCountry = item.name;
                const flag = item.flags.png;
                const currencies = item.currencies && item.currencies;
                const languages = item.languages && item.languages;
                const {
                  nativeName,
                  numericCode,
                  population,
                  region,
                  capital,
                  subregion,
                  topLevelDomain,
                } = item;

                return (
                  <article
                    key={numericCode}
                    className="countryDetailsContainer"
                  >
                    <div className="countryflag">
                      <img
                        className="country_img"
                        src={flag.toString()}
                        alt={nameOfCountry.toString()}
                      />
                    </div>
                    <div className="country_group2">
                      <h2 className="country_name">{nameOfCountry}</h2>
                      <div className="county_specs">
                        <div className="country_bloc1">
                          <p className="native_class">
                            Native Name: <span>{nativeName}</span>
                          </p>
                          <p>
                            Population:{" "}
                            <span>
                              {population && population.toLocaleString("en-US")}
                            </span>{" "}
                          </p>
                          <p>
                            Region: <span>{region}</span>
                          </p>
                          <p>
                            Sub Region: <span>{subregion}</span>
                          </p>
                          <p>
                            Capital: <span>{capital}</span>
                          </p>
                        </div>
                        <div className="country_bloc2">
                          <p>
                            Top Level Domain: <span>{topLevelDomain}</span>
                          </p>
                          <p>
                            Currencies:{" "}
                            <span>
                              {currencies &&
                                currencies.map(
                                  (item, index) =>
                                    `${
                                      index !== currencies.length - 1
                                        ? item.name + ","
                                        : item.name
                                    }`
                                )}
                            </span>
                          </p>
                          <p className="country_lang">
                            Languages:{" "}
                            <span className="language">
                              {languages &&
                                languages.map(
                                  (item, index) =>
                                    `${
                                      index !== languages.length - 1
                                        ? item.name + ", "
                                        : item.name
                                    }`
                                )}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="country_borders">
                        <h3>Border Countries: </h3>
                        <div className="borders">
                          {countryBorders &&
                            countryBorders.map((border, item) => (
                              <Link
                                to={`/${border}`}
                                key={item}
                                className="borderbtn"
                              >
                                {border}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
          </section>
        )}
      </div>
    </>
  );
};

export default Country;
