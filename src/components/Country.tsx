import React from "react";

import "./country.css";
import { Link } from "react-router-dom";
import useDisplayCountry from "../hooks/useDisplayCountry";

const Country = () => {
 const {
   isLoading,
   setIsLoading,
   filterCountries,
   handleSelectBorder,
   countryBorders,error,
 } = useDisplayCountry();

  return (
    <>
      {!isLoading && (
        <Link to="/" className="backbtn">
          &larr; Back
        </Link>
      )}

      {isLoading && <p className="LoadMessage">Loading......</p>}
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
                            countryBorders.map((border, item) => {
                              return (
                                <span onClick={() => handleSelectBorder(border)} className="borderbtn">
                                  {border.length > 12
                                    ? border.slice(0, 12) + "..."
                                    : border}
                                </span>
                              );
                            })}
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
