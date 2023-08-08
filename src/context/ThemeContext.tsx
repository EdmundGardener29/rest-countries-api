import React,{ createContext, useState} from 'react'
import { ThemeContextType } from '../types/ContextType';


export const nightModeContext= createContext({} as ThemeContextType)

  const ThemeContext = ({children}:{children: React.ReactNode}) => {
      const [dark, setDark] = useState(false)

  return (
    <nightModeContext.Provider value={{dark, setDark}}>
        {children}
    </nightModeContext.Provider>
  )
}

export default ThemeContext
