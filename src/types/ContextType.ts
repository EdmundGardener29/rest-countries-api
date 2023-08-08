import { countryDetailsType } from "./CountryTypes";

type ThemeContextType={
    dark: boolean;
    setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

type DataContextType={
    countriesData:countryDetailsType[];
    setCountriesData:React.Dispatch<React.SetStateAction<countryDetailsType[]>>
}

export type {ThemeContextType,DataContextType};