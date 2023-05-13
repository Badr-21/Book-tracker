import "./App.css";
import Header from "./components/Header";
// import Home from "./components/Home";
// import MyBooks from "./components/MyBooks";
// import Searched from "./components/Searched";
// import BooksReadingNow from "./components/BooksReadingNow";
// import BooksFavorite from "./components/BooksFavorite";
// import BooksToRead from "./components/BooksToRead";
// import BooksHaveRead from "./components/BooksHaveRead";
// import MyNotes from "./components/MyNotes";
// import AllNotesBook from "./components/AllNotesBook";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { createContext, useState } from "react";

import { BrowserRouter as Router /*Routes, Route*/ } from "react-router-dom";

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

   // const [data, setData] = useState();
   // const [bookDetails, setBookDetails] = useState();

   // const getLocalStorage = (name) => {
   //    if (localStorage.getItem(name)) {
   //       return JSON.parse(localStorage.getItem(name));
   //    } else {
   //       return [];
   //    }
   // };

   const [currentReadingBooks, setCurrentReadingBooks] = useState(() =>
      getLocalStorage("current reading books")
   );
   const [favoriteBooks, setFavoriteBooks] = useState(() => getLocalStorage("favorite books"));
   const [toReadBooks, setToReadBooks] = useState(() => getLocalStorage("to read books"));
   const [haveReadBooks, setHaveReadBooks] = useState(() => getLocalStorage("have read books"));
   // const [allBooks, setAllBooks] = useState(() => getLocalStorage("all books"));
   // const [allNotes, setAllNotes] = useState(() => getLocalStorage("all notes"));

   return (
      <Router>
         <div className="App">
            <currentReadingContext.Provider value={{ currentReadingBooks, setCurrentReadingBooks }}>
               <favoriteBooksContext.Provider value={{ favoriteBooks, setFavoriteBooks }}>
                  <toReadBooksContext.Provider value={{ toReadBooks, setToReadBooks }}>
                     <haveReadBooksContext.Provider value={{ haveReadBooks, setHaveReadBooks }}>
                        <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>
                        {/* <Routes>
                           <Route
                              path="/"
                              element={
                                 <Home
                                    darkMode={darkMode}
                                    data={data}
                                    setData={setData}
                                    setBookDetails={setBookDetails}
                                 />
                              }
                           />
                           <Route path="mybooks">
                              <Route
                                 index
                                 element={
                                    <MyBooks
                                       darkMode={darkMode}
                                       setBookDetails={setBookDetails}
                                       allBooks={allBooks}
                                    />
                                 }
                              ></Route>
                              <Route path="booksreadingnow">
                                 <Route
                                    index
                                    element={
                                       <BooksReadingNow
                                          darkMode={darkMode}
                                          allNotes={allNotes}
                                          setAllNotes={setAllNotes}
                                          setBookDetails={setBookDetails}
                                       />
                                    }
                                 />
                                 <Route
                                    path=":id"
                                    element={
                                       <AllNotesBook
                                          darkMode={darkMode}
                                          allNotes={allNotes}
                                          setAllNotes={setAllNotes}
                                       />
                                    }
                                 ></Route>
                              </Route>
                              <Route
                                 path="favoritebooks"
                                 element={
                                    <BooksFavorite
                                       darkMode={darkMode}
                                       setBookDetails={setBookDetails}
                                    />
                                 }
                              />
                              <Route
                                 path="bookstoread"
                                 element={
                                    <BooksToRead
                                       darkMode={darkMode}
                                       setBookDetails={setBookDetails}
                                    />
                                 }
                              />
                              <Route
                                 path="bookshaveread"
                                 element={
                                    <BooksHaveRead
                                       darkMode={darkMode}
                                       setBookDetails={setBookDetails}
                                    />
                                 }
                              />
                           </Route>
                           <Route
                              path="mynotes"
                              element={
                                 <MyNotes
                                    allNotes={allNotes}
                                    setAllNotes={setAllNotes}
                                    darkMode={darkMode}
                                 />
                              }
                           />
                           <Route
                              path="searchedbook/:booktitle"
                              element={
                                 <Searched
                                    darkMode={darkMode}
                                    bookDetails={bookDetails}
                                    allBooks={allBooks}
                                    setAllBooks={setAllBooks}
                                 />
                              }
                           />
                        </Routes> */}
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
