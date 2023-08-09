import React from "react";
import { useEffect, useContext, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { nightModeContext } from "../context/ThemeContext";

const Header = () => {
  const { dark, setDark } = useContext(nightModeContext);
  const [error, setError] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    try {
      const localVar = localStorage.getItem("Mode");

      if (localVar) {
        setDark(JSON.parse(localVar));
      }
    } catch (err: any) {
      setError("Error Saving To Local Storage!");
    }
  }, [setDark]);

  error && console.log(error);

  useEffect(() => {
    try {
      localStorage.setItem("Mode", JSON.stringify(dark));
    } catch (err: any) {
      setError("Error Saving To Local Storage!");
    }
  }, [dark]);

 useEffect(() => {
   const handleScroll = () => {
     const scrollPosition =
       window.scrollY ||
       document.documentElement.scrollTop ||
       document.body.scrollTop;
     if (scrollPosition > 90) {
       setIsSticky(true);
     } else {
       setIsSticky(false);
     }
   };

   window.addEventListener("scroll", handleScroll);

   return () => {
     window.removeEventListener("scroll", handleScroll);
   };
 }, []);  

  return (
    <>
      <section className={`head_section ${isSticky && 'sticky-header'}`}>
        <div>
          <h1>Where in the World?</h1>
        </div>

        <div className="theme_class" onClick={() => setDark(!dark)}>
          {dark ? (
            <span className="icon moon-fill">
              <IoMdMoon />
            </span>
          ) : (
            <span className="icon moon-outline">
              <IoMoonOutline />
            </span>
          )}
          Dark Mode
        </div>
      </section>
    </>
  );
};

export default Header;
