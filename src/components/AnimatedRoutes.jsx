import { useState } from "react";
import Home from "./Home";
import MyBooks from "./MyBooks";
import Searched from "./Searched";
import BooksCurrentReading from "./BooksCurrentReading";
import BooksFavorite from "./BooksFavorite";
import BooksToRead from "./BooksToRead";
import BooksHaveRead from "./BooksHaveRead";
import BooksArchived from "./BooksArchived";
import MyNotes from "./MyNotes";
import AllCurrentReadingBooksNotes from "./AllCurrentReadingBooksNotes";
import CurrentReadingBooksNotes from "./CurrentReadingBooksNotes";
import ArchivedBooksNotes from "./ArchivedBooksNotes";
import AllArchivedBooksNotes from "./AllArchivedBooksNotes";
import { Routes, Route, useLocation } from "react-router-dom";
import { getLocalStorage } from "../App";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes({ darkMode }) {
   const [data, setData] = useState();
   const [bookDetails, setBookDetails] = useState();
   const [allBooks, setAllBooks] = useState(() => getLocalStorage("all books"));
   const [archivedBooks, setArchivedBooks] = useState(() => getLocalStorage("archived books"));
   const [currentReadingBookNotes, setCurrentReadingBookNotes] = useState(() =>
      getLocalStorage("current reading book notes")
   );
   const [archivedBookNotes, setArchivedBookNotes] = useState(() =>
      getLocalStorage("archived book notes")
   );

   const location = useLocation();

   return (
      <main style={darkMode ? { backgroundColor: "#1f1f1f" } : { backgroundColor: "#ffffff" }}>
         <AnimatePresence>
            <Routes location={location} key={location.pathname}>
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
                  />
                  <Route
                     path="bookscurrentreading"
                     index
                     element={
                        <BooksCurrentReading
                           darkMode={darkMode}
                           currentReadingBookNotes={currentReadingBookNotes}
                           setCurrentReadingBookNotes={setCurrentReadingBookNotes}
                           setArchivedBooks={setArchivedBooks}
                           archivedBooks={archivedBooks}
                           archivedBookNotes={archivedBookNotes}
                           setArchivedBookNotes={setArchivedBookNotes}
                        />
                     }
                  />
                  <Route
                     path="favoritebooks"
                     element={<BooksFavorite darkMode={darkMode} setBookDetails={setBookDetails} />}
                  />
                  <Route
                     path="bookstoread"
                     element={<BooksToRead darkMode={darkMode} setBookDetails={setBookDetails} />}
                  />
                  <Route
                     path="bookshaveread"
                     element={<BooksHaveRead darkMode={darkMode} setBookDetails={setBookDetails} />}
                  />
                  <Route
                     path="booksarchived"
                     element={
                        <BooksArchived
                           darkMode={darkMode}
                           archivedBooks={archivedBooks}
                           setArchivedBooks={setArchivedBooks}
                           archivedBookNotes={archivedBookNotes}
                           setArchivedBookNotes={setArchivedBookNotes}
                           currentReadingBookNotes={currentReadingBookNotes}
                           setCurrentReadingBookNotes={setCurrentReadingBookNotes}
                        />
                     }
                  />
               </Route>
               <Route path="mynotes" element={<MyNotes darkMode={darkMode} />}>
                  <Route path="currentreadingbooksnotes">
                     <Route
                        index
                        element={
                           <CurrentReadingBooksNotes
                              currentReadingBookNotes={currentReadingBookNotes}
                              setCurrentReadingBookNotes={setCurrentReadingBookNotes}
                              darkMode={darkMode}
                           />
                        }
                     />
                     <Route
                        path=":id"
                        element={
                           <AllCurrentReadingBooksNotes
                              darkMode={darkMode}
                              currentReadingBookNotes={currentReadingBookNotes}
                              setCurrentReadingBookNotes={setCurrentReadingBookNotes}
                           />
                        }
                     />
                  </Route>
                  <Route path="archivedbooksnotes">
                     <Route
                        index
                        element={
                           <ArchivedBooksNotes
                              archivedBookNotes={archivedBookNotes}
                              darkMode={darkMode}
                           />
                        }
                     />
                     <Route
                        path=":id"
                        element={
                           <AllArchivedBooksNotes
                              darkMode={darkMode}
                              archivedBookNotes={archivedBookNotes}
                              setArchivedBookNotes={setArchivedBookNotes}
                           />
                        }
                     />
                  </Route>
               </Route>
               <Route
                  path="searchedbook/:booktitle"
                  element={
                     <Searched
                        darkMode={darkMode}
                        bookDetails={bookDetails}
                        allBooks={allBooks}
                        setAllBooks={setAllBooks}
                        archivedBooks={archivedBooks}
                     />
                  }
               />
            </Routes>
         </AnimatePresence>
      </main>
   );
}

export default AnimatedRoutes;
