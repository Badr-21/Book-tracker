import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import MyBooks from "./components/MyBooks";
import Searched from "./components/Searched";
import BooksReadingNow from "./components/BooksReadingNow";
import BooksFavorite from "./components/BooksFavorite";
import BooksToRead from "./components/BooksToRead";
import BooksHaveRead from "./components/BooksHaveRead";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const readingNowBooksContext = createContext();
export const favoriteBooksContext = createContext();
export const toReadBooksContext = createContext();
export const haveReadBooksContext = createContext();

function App() {
   const [darkMode, setDarkMode] = useState(false);
   const [data, setData] = useState();
   const [bookId, setBookId] = useState("");
   const [bookDetails, setBookDetails] = useState();
   const [readingNowBooks, setReadingNowBooks] = useState([]);
   const [favoriteBooks, setFavoriteBooks] = useState([]);
   const [toReadBooks, setToReadBooks] = useState([]);
   const [haveReadBooks, setHaveReadBooks] = useState([]);

   return (
      <Router>
         <div className="App">
            <readingNowBooksContext.Provider value={{ readingNowBooks, setReadingNowBooks }}>
               <favoriteBooksContext.Provider value={{ favoriteBooks, setFavoriteBooks }}>
                  <toReadBooksContext.Provider value={{ toReadBooks, setToReadBooks }}>
                     <haveReadBooksContext.Provider value={{ haveReadBooks, setHaveReadBooks }}>
                        <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>
                        <Routes>
                           <Route
                              path="/"
                              element={
                                 <Home
                                    bookId={bookId}
                                    setBookId={setBookId}
                                    darkMode={darkMode}
                                    data={data}
                                    setData={setData}
                                 />
                              }
                           />
                           <Route path="mybooks">
                              <Route
                                 index
                                 element={
                                    <MyBooks
                                       haveReadBooks={haveReadBooks}
                                       setHaveReadBooks={setHaveReadBooks}
                                       darkMode={darkMode}
                                       bookId={bookId}
                                       setBookId={setBookId}
                                    />
                                 }
                              ></Route>
                              <Route
                                 path="booksreadingnow"
                                 element={<BooksReadingNow darkMode={darkMode} />}
                              />
                              <Route
                                 path="favoritebooks"
                                 element={<BooksFavorite darkMode={darkMode} />}
                              />
                              <Route
                                 path="bookstoread"
                                 element={<BooksToRead darkMode={darkMode} />}
                              />
                              <Route
                                 path="bookshaveread"
                                 element={<BooksHaveRead darkMode={darkMode} />}
                              />
                           </Route>
                           <Route
                              path="searchedbook/:booktitle"
                              element={
                                 <Searched
                                    bookId={bookId}
                                    bookDetails={bookDetails}
                                    setBookDetails={setBookDetails}
                                    darkMode={darkMode}
                                    data={data}
                                 />
                              }
                           />
                        </Routes>
                     </haveReadBooksContext.Provider>
                  </toReadBooksContext.Provider>
               </favoriteBooksContext.Provider>
            </readingNowBooksContext.Provider>
         </div>
      </Router>
   );
}

export default App;
