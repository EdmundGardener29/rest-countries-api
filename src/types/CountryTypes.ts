 type countryType={
    name:string,
    flags:{
        png:string
    },
    population:number,
    region:string,
    capital:string,
    numericCode:number
}



type countryDetailsType={
    name:string,
    nativeName:string,
    flags:{
        png:string
    },
    alpha3Code:string;
    population:number,
    region:string,
    subregion:string,
    capital:string,
    numericCode:number,
    topLevelDomain:string[],
    currencies:{code:string,name:string,symbol:string}[],
    languages:{name:string}[],
    borders:string[],
}

export type {countryType,countryDetailsType}