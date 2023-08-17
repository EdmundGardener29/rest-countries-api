import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./country.css";

type countryDetail = {
  name: string;
  nativeName: string;
  flags: { png: string };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  numericCode: number;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
};

const CountryBorders = () => {
  const [countborder, setCountBorder] = useState({} as countryDetail);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const { code, cname } = useParams();

  useEffect(() => {
    const fetchCountryDetail = async () => {
      try {
        const result = code
          ? await fetch(`https://restcountries.com/v2/alpha/${code}`)
          : await fetch(`https://restcountries.com/v2/name/${cname}`);

        if (!result.ok) {
          throw new Error("Record not found");
        }
        const data = await result.json();
        code ? setCountBorder(data) : setCountBorder(data[0]);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchCountryDetail();
  }, [code, cname]);

  const {
    name,
    nativeName,
    flags,
    population,
    region,
    capital,
    subregion,
    topLevelDomain,
    borders,
    currencies,
    languages,
  } = countborder;

  return (
    <>
      <Link to="/" className="bkbutton">
        &larr; Back
      </Link>

      {isLoading && !error && <p className="LoadMsg">Loading......</p>}
      {error && !isLoading && <p className="ErrorLog">{error}</p>}
      {!error && Object.keys(countborder).length === 0 && !isLoading && (
        <p className="LogMsg">{"No Record Found .....!!! "}</p>
      )}
      {
        <div className="count_bg">
          {!error && (
            <section>
              <article className="country_container">
                <div className="csflag">
                  {flags && (
                    <img className="country_img" src={flags.png} alt={name} />
                  )}
                </div>
                <div className="country_group2">
                  <div className="county_specs">
                    <div className="country_bloc1">
                      <h2 className="country_name">{name}</h2>
                      <h5 className="native_class">
                        Native Name: <span>{nativeName}</span>
                      </h5>
                      <h5>
                        Population:{" "}
                        <span>
                          {population && population.toLocaleString("en-US")}
                        </span>{" "}
                      </h5>
                      <h5>
                        Region: <span>{region}</span>
                      </h5>
                      <h5>
                        Sub Region: <span>{subregion}</span>
                      </h5>
                      <h5>
                        Capital: <span>{capital}</span>
                      </h5>
                    </div>
                    <div className="country_dsection1">
                      <h5>
                        Top Level Domain: <span>{topLevelDomain}</span>
                      </h5>
                      <h5>
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
                      </h5>
                      <h5>
                        Languages:{" "}
                        <span>
                          {languages &&
                            languages.map(
                              (item, index) =>
                                `${
                                  index !== languages.length - 1
                                    ? item.name + ","
                                    : item.name
                                }`
                            )}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="country_dsection2">
                    <h3>Border Countries: </h3>
                    <div className="borders">
                      {borders &&
                        borders.map((border) => {
                          return (
                            <ul key={border}>
                              <Link
                                to={`/${name}/${border}`}
                                className="borderbtn"
                              >
                                <li>{border}</li>
                              </Link>
                            </ul>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </article>
            </section>
          )}
        </div>
      }
    </>
  );
};

export default CountryBorders;
