import logo from "../assets/book-tracker-logo.svg";
import logoDarkMode from "../assets/book-tracker-logo-darkmode.svg";
import "../styles/headerStyles/header.css";
import { darkModeContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Header() {
   const { darkMode, setDarkMode } = useContext(darkModeContext);
   const handleDarkMode = () => {
      setDarkMode(!darkMode);
   };
   return (
      <header className={darkMode ? "header dark-mode" : "header"}>
         <div className="header-logo">
            <img src={darkMode ? logoDarkMode : logo} alt="Books icon" />
         </div>
         <nav className="header-nav">
            <ul>
               <li>
                  <Link
                     style={
                        darkMode
                           ? { color: "#66b8ff", textDecoration: "none" }
                           : { color: "#003147", textDecoration: "none" }
                     }
                     to="/"
                  >
                     Home
                  </Link>
               </li>
               <li>
                  <Link
                     style={
                        darkMode
                           ? { color: "#66b8ff", textDecoration: "none" }
                           : { color: "#003147", textDecoration: "none" }
                     }
                     to="mybooks"
                  >
                     My Books
                  </Link>
               </li>
               <li>
                  <Link
                     style={
                        darkMode
                           ? { color: "#66b8ff", textDecoration: "none" }
                           : { color: "#003147", textDecoration: "none" }
                     }
                     to="search"
                  >
                     Search
                  </Link>
               </li>
            </ul>
            <div className={darkMode ? "mode dark-mode" : "mode"}>
               <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
               <label className="toggle">
                  <input type="checkbox" onClick={handleDarkMode} />
                  <span className="slider"></span>
               </label>
            </div>
         </nav>
      </header>
   );
}

export default Header;
