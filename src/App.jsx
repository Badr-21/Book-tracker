import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AnimatedRoutes from "./animatedRoutes/AnimatedRoutes";

import { BrowserRouter as Router } from "react-router-dom";

export const currentReadingContext = createContext();
export const favoriteBooksContext = createContext();
export const toReadBooksContext = createContext();
export const haveReadBooksContext = createContext();

export const getLocalStorage = (name) => {
   if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
   } else {
      return [];
   }
};

function App() {
   const [darkMode, setDarkMode] = useState(false);

   const [currentReadingBooks, setCurrentReadingBooks] = useState(() =>
      getLocalStorage("current reading books")
   );
   const [favoriteBooks, setFavoriteBooks] = useState(() => getLocalStorage("favorite books"));
   const [toReadBooks, setToReadBooks] = useState(() => getLocalStorage("to read books"));
   const [haveReadBooks, setHaveReadBooks] = useState(() => getLocalStorage("have read books"));

   return (
      <Router>
         <div className="App">
            <currentReadingContext.Provider value={{ currentReadingBooks, setCurrentReadingBooks }}>
               <favoriteBooksContext.Provider value={{ favoriteBooks, setFavoriteBooks }}>
                  <toReadBooksContext.Provider value={{ toReadBooks, setToReadBooks }}>
                     <haveReadBooksContext.Provider value={{ haveReadBooks, setHaveReadBooks }}>
                        <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>
                        <AnimatedRoutes darkMode={darkMode} />
                     </haveReadBooksContext.Provider>
                  </toReadBooksContext.Provider>
               </favoriteBooksContext.Provider>
            </currentReadingContext.Provider>
         </div>
      </Router>
   );
}

export default App;
