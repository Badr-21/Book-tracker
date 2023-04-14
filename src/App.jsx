import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import MyBooks from "./components/MyBooks";
import Search from "./components/Search";
import BooksReadingNow from "./components/BooksReadingNow";
import FavoriteBooks from "./components/FavoriteBooks";
import BooksToRead from "./components/BooksToRead";
import BooksHaveRead from "./components/BooksHaveRead";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const darkModeContext = createContext();
export const dataContext = createContext();

function App() {
   const [darkMode, setDarkMode] = useState(false);
   const [data, setData] = useState();

   return (
      <Router>
         <div className="App">
            <darkModeContext.Provider value={{ darkMode, setDarkMode }}>
               <dataContext.Provider value={{ data, setData }}>
                  <Header></Header>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="mybooks">
                        <Route index element={<MyBooks />}></Route>
                        <Route index path="booksreadingnow" element={<BooksReadingNow />} />
                        <Route path="favoritebooks" element={<FavoriteBooks />} />
                        <Route path="bookstoread" element={<BooksToRead />} />
                        <Route path="bookshaveread" element={<BooksHaveRead />} />
                     </Route>
                     <Route path="search" element={<Search />} />
                  </Routes>
               </dataContext.Provider>
            </darkModeContext.Provider>
         </div>
      </Router>
   );
}

export default App;
