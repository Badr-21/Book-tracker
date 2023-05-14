import { useContext, useState, useEffect } from "react";
import "../styles/booksCurrentReadingStyles/booksCurrentReading.css";
import Back from "./Back";
import { currentReadingContext } from "../App";
import WriteNote from "./WriteNote";
import DisplayNote from "./DispalyNote";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import BookArchivedIcon from "../assets/book-archived-icon.svg";
import BookArchivedIconDarMode from "../assets/book-archive-icon-darkmode.svg";
import noteWriteIcon from "../assets/note-write-icon.svg";
import noteWriteIconDarkMode from "../assets/note-write-icon-darkmode.svg";
import { motion } from "framer-motion";
import Toast, { notifyDeniedArchiving, notifyEmptyList } from "./Toast";
import {
   archiveBookAlert,
   archiveBookConfirm,
   deleteOneItemAlert,
   deleteOneItemConfirmed,
   deleteAllItemsAlert,
   deleteAllItemsConfirm,
   deleteOneBookWithNoteAlert,
   deleteAllBooksWithNoteAlert,
} from "../components/ConfirmAlert";

function BooksCurrentReading({
   darkMode,
   currentReadingBookNotes,
   setCurrentReadingBookNotes,
   archivedBooks,
   setArchivedBooks,
   archivedBookNotes,
   setArchivedBookNotes,
}) {
   const { currentReadingBooks, setCurrentReadingBooks } = useContext(currentReadingContext);
   const [currentBook, setCurrentBook] = useState();
   const [bookId, setBookId] = useState("");

   const selectCurrentBook = (e) => {
      const currentB = currentReadingBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setCurrentBook(...currentB);
      setBookId(currentB[0].id);
   };

   const moveToArchivedBooks = (e) => {
      const foundNote = currentReadingBookNotes.filter((note) => note.bookId === e.target.id);
      if (foundNote.length) {
         archiveBookAlert(darkMode).then((result) => {
            if (result.isConfirmed) {
               const MovedBook = currentReadingBooks.filter((bookNotes) => {
                  return bookNotes.id === e.target.id;
               });
               setArchivedBooks([...archivedBooks, ...MovedBook]);

               const movedNotes = currentReadingBookNotes.filter((bookNotes) => {
                  return bookNotes.bookId === e.target.id;
               });
               setArchivedBookNotes([...archivedBookNotes, ...movedNotes]);

               const nonMovedNotes = currentReadingBookNotes.filter((bookNotes) => {
                  return bookNotes.bookId !== e.target.id;
               });
               setCurrentReadingBookNotes(nonMovedNotes);

               const nonMovedCurrentReadingBooks = currentReadingBooks.filter((bookNotes) => {
                  return bookNotes.id !== e.target.id;
               });
               setCurrentReadingBooks(nonMovedCurrentReadingBooks);

               setCurrentBook(null);
            }
            archiveBookConfirm(darkMode);
         });
      } else {
         notifyDeniedArchiving();
      }
   };

   const deleteCurrentReadingBooks = (e) => {
      const foundNote = currentReadingBookNotes.filter((note) => note.bookId === e.target.id);
      if (foundNote.length) {
         deleteOneBookWithNoteAlert(darkMode).then((result) => {
            if (result.isConfirmed) {
               if (currentReadingBooks.length > 1) {
                  const nonDeletedBooks = currentReadingBooks.filter(
                     (book) => book.id !== e.target.id
                  );
                  const nonDeletedNotes = currentReadingBookNotes.filter(
                     (note) => note.bookId !== e.target.id
                  );
                  setCurrentReadingBooks(nonDeletedBooks);
                  setCurrentReadingBookNotes(nonDeletedNotes);
               } else {
                  setCurrentReadingBooks([]);
                  setCurrentReadingBookNotes([]);
                  setCurrentBook("");
               }
               deleteOneItemConfirmed(darkMode, "book");
            }
         });
      } else {
         deleteOneItemAlert(darkMode, "book").then((result) => {
            if (result.isConfirmed) {
               if (currentReadingBooks.length > 1) {
                  const nonDeletedBooks = currentReadingBooks.filter(
                     (book) => book.id !== e.target.id
                  );
                  const nonDeletedNotes = currentReadingBookNotes.filter(
                     (note) => note.bookId !== e.target.id
                  );
                  setCurrentReadingBooks(nonDeletedBooks);
                  setCurrentReadingBookNotes(nonDeletedNotes);
                  setCurrentBook("");
               } else {
                  setCurrentReadingBooks([]);
                  setCurrentReadingBookNotes([]);
                  setCurrentBook("");
               }
               deleteOneItemConfirmed(darkMode, "book");
            }
         });
      }
   };

   const deleteAllCurrentReadingBooks = () => {
      if (currentReadingBooks.length) {
         if (currentReadingBookNotes.length) {
            deleteAllBooksWithNoteAlert(darkMode).then((result) => {
               if (result.isConfirmed) {
                  setCurrentReadingBooks([]);
                  setCurrentReadingBookNotes([]);
                  setCurrentBook("");
                  deleteAllItemsConfirm(darkMode, "books");
               }
            });
         } else {
            deleteAllItemsAlert(darkMode, "books").then((result) => {
               if (result.isConfirmed) {
                  setCurrentReadingBooks([]);
                  setCurrentReadingBookNotes([]);
                  setCurrentBook("");
                  deleteAllItemsConfirm(darkMode, "books");
               }
            });
         }
      } else {
         notifyEmptyList(' "current reading books" ');
      }
   };

   useEffect(() => {
      if (currentReadingBooks) {
         localStorage.setItem("current reading books", JSON.stringify(currentReadingBooks));
      }
   }, [currentReadingBooks]);

   useEffect(() => {
      if (currentReadingBookNotes) {
         localStorage.setItem(
            "current reading book notes",
            JSON.stringify(currentReadingBookNotes)
         );
      }
   }, [currentReadingBookNotes]);

   useEffect(() => {
      if (archivedBooks) {
         localStorage.setItem("archived books", JSON.stringify(archivedBooks));
      }
   }, [archivedBooks]);

   useEffect(() => {
      if (archivedBookNotes) {
         localStorage.setItem("archived book notes", JSON.stringify(archivedBookNotes));
      }
   }, [archivedBookNotes]);

   return (
      <motion.main
         className={
            darkMode
               ? "books-current-reading-container dark-mode"
               : "books-current-reading-container"
         }
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{
            opacity: 0,
         }}
      >
         <Back darkMode={darkMode} />
         <section className="write-display-note">
            <WriteNote
               currentBook={currentBook}
               bookId={bookId}
               darkMode={darkMode}
               currentReadingBookNotes={currentReadingBookNotes}
               setCurrentReadingBookNotes={setCurrentReadingBookNotes}
            />
            <DisplayNote
               currentBook={currentBook}
               currentReadingBookNotes={currentReadingBookNotes}
               bookId={bookId}
               darkMode={darkMode}
            />
         </section>
         <h3 className="category-book">
            Current Reading books
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllCurrentReadingBooks}
            />
         </h3>
         <section className="display-current-reading-books">
            {currentReadingBooks
               ? currentReadingBooks.map((book) => {
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
                             <img
                                src={darkMode ? BookArchivedIconDarMode : BookArchivedIcon}
                                alt="see book icon"
                                id={book.id}
                                onClick={moveToArchivedBooks}
                             />
                             <img
                                src={darkMode ? deleteIconDarkMode : deleteIcon}
                                alt="delete icon"
                                id={book.id}
                                onClick={deleteCurrentReadingBooks}
                             />
                          </div>
                       </div>
                    );
                 })
               : null}
         </section>
         <Toast darkMode={darkMode} />
      </motion.main>
   );
}

export default BooksCurrentReading;
