import React from "react";
import { HiSearch } from "react-icons/hi";
import { inputTS } from "../types/InputTypes";
import { useRef, useEffect } from "react";

const Search = ({ countrySearch, value, oregion, regionSearch }: inputTS) => {
  const inputTag = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputTag.current?.focus();
  };

  useEffect(() => {
    inputTag.current?.focus();
  }, []);

  return (
    <div>
      <section className="searchbar">
        <div className="search_filter">
          <HiSearch className="isearch" onClick={handleClick} />
          <input
            ref={inputTag}
            type="search"
            name="filter"
            id="input_filter"
            value={value}
            placeholder="Search for a Country ...."
            onChange={(e) => countrySearch(e.target.value)}
          />
        </div>

        <div className="region_filter">
          <select
            name="select"
            id="select"
            className="select_region"
            value={oregion}
            onChange={(e) => regionSearch(e.target.value)}
          >
            <option value="Filter by Region">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default Search;
