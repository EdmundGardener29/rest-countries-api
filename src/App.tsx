import React from "react";
import { useContext } from "react";
import Countries from "./components/Countries";
import Header from "./components/Header";
import Country from "./components/Country";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route } from "react-router-dom";
import { nightModeContext } from "./context/ThemeContext";

function App() {
  const { dark } = useContext(nightModeContext);

  return (
    <div className={dark ? "dark" : "light"}>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path=":countryName" element={<Country />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
