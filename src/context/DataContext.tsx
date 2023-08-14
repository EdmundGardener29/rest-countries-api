import React,{createContext, useState, useEffect} from 'react'
import { countryDetailsType} from '../types/CountryTypes'
import { DataContextType } from '../types/ContextType';

const url='https://restcountries.com/v2/all';



  export const DataFileContext= createContext({} as DataContextType)

  const DataContext = ({children}:{children: React.ReactNode}) => {
      const [countriesData,setCountriesData]=useState<countryDetailsType[]>([]);

      useEffect(()=>{

          const fetchAllCountriesData=async()=>{
            try {
                const response=await fetch(url);
                if(!response.ok) throw new Error('Connection Not Established!')
                const data =await response.json();
                setCountriesData(data);
                
            } catch (error:any) {
                console.log(error)
            } 
        }

        fetchAllCountriesData()

      },[])

  return (
    <DataFileContext.Provider value={{countriesData,setCountriesData}}>
        {children}
    </DataFileContext.Provider>
  )
}

export default DataContext
