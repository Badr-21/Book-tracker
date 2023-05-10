import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readingNowBooksContext } from "../App";
import "../styles/booksReadingNowStyles/booksReadingNow.css";
import Back from "./Back";
import WriteNote from "./WriteNote";
import DisplayNote from "./DispalyNote";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import seeBookIcon from "../assets/see-book-icon.svg";
import seeBookIconDarkMode from "../assets/see-book-icon-darkmode.svg";
import noteWriteIcon from "../assets/note-write-icon.svg";
import noteWriteIconDarkMode from "../assets/note-write-icon-darkmode.svg";

function BooksReadingNow({ darkMode, allNotes, setAllNotes, setBookDetails }) {
   const { setReadingNowBooks, readingNowBooks } = useContext(readingNowBooksContext);
   const [currentBook, setCurrentBook] = useState();
   const [bookId, setBookId] = useState("");

   const selectCurrentBook = (e) => {
      const currentB = readingNowBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setCurrentBook(...currentB);
      setBookId(currentB[0].id);
   };

   const SeeReadingNowBooks = (e) => {
      const seeBook = readingNowBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setBookDetails(...seeBook);
   };

   const deleteReadingNowBooks = (e) => {
      if (readingNowBooks.length > 1) {
         const nonDeletedBooks = readingNowBooks.filter((book) => book.id !== e.target.id);
         const nonDeletedNotes = allNotes.filter((note) => note.bookId !== e.target.id);
         setReadingNowBooks(nonDeletedBooks);
         setAllNotes(nonDeletedNotes);
      } else {
         setReadingNowBooks([]);
         setAllNotes([]);
         setCurrentBook("");
      }
   };

   const deleteAllReadingNowBooks = () => {
      setReadingNowBooks([]);
      setAllNotes([]);
      setCurrentBook("");
   };

   useEffect(() => {
      if (readingNowBooks) {
         localStorage.setItem("reading now books", JSON.stringify(readingNowBooks));
      }
   }, [readingNowBooks]);

   return (
      <main
         className={
            darkMode ? "books-reading-now-container dark-mode" : "books-reading-now-container"
         }
      >
         <Back darkMode={darkMode} />
         <section className="write-display-note">
            <WriteNote
               currentBook={currentBook}
               bookId={bookId}
               darkMode={darkMode}
               allNotes={allNotes}
               setAllNotes={setAllNotes}
            />
            <DisplayNote
               currentBook={currentBook}
               allNotes={allNotes}
               bookId={bookId}
               darkMode={darkMode}
            />
         </section>
         <h3 className="category-book">
            Reading now books
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllReadingNowBooks}
            />
         </h3>
         <section className="display-reading-now-books">
            {readingNowBooks
               ? readingNowBooks.map((book) => {
                    return (
                       <div key={book.id} className="books-displayed">
                          <img
                             src={book.volumeInfo.imageLinks.thumbnail}
                             alt={book.volumeInfo.title}
                          />
                          <div className="see-and-delete-icons">
                             <img
                                src={darkMode ? noteWriteIconDarkMode : noteWriteIcon}
                                alt="note edit icon"
                                id={book.id}
                                onClick={selectCurrentBook}
                             />
                             <Link to={`/searchedbook/${book.id}`}>
                                <img
                                   src={darkMode ? seeBookIconDarkMode : seeBookIcon}
                                   alt="see book icon"
                                   id={book.id}
                                   onClick={SeeReadingNowBooks}
                                />
                             </Link>
                             <img
                                src={darkMode ? deleteIconDarkMode : deleteIcon}
                                alt="delete icon"
                                id={book.id}
                                onClick={deleteReadingNowBooks}
                             />
                          </div>
                       </div>
                    );
                 })
               : null}
         </section>
      </main>
   );
}

export default BooksReadingNow;
