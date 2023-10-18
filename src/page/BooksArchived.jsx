import { useEffect, useContext, useRef } from "react";
import Back from "../components/Back";
import { currentReadingContext } from "../App";
import "../styles/booksArchivedStyles/booksArchived.css";
import deleteIcon from "../assets/delete-icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import allNotesIcon from "../assets/all-notes-icon.svg";
import allNotesIconDarkMode from "../assets/all-notes-icon-darkmode.svg";
import moveBackIcon from "../assets/move-back-icon.svg";
import moveBackIconDarkMode from "../assets/move-back-icon-darkmode.svg";
import { Link } from "react-router-dom";
import {
   deleteOneItemAlert,
   deleteOneItemConfirmed,
   deleteAllItemsAlert,
   deleteAllItemsConfirm,
   deleteOneBookWithNoteAlert,
   deleteAllArchivedBooksAlert,
   moveBackBookAlert,
   moveBackBookConfirm,
} from "../components/ConfirmAlert";
import Toast, { notifyEmptyList } from "../components/Toast";

function BooksArchived({
   darkMode,
   archivedBooks,
   setArchivedBooks,
   archivedBookNotes,
   setArchivedBookNotes,
   currentReadingBookNotes,
   setCurrentReadingBookNotes,
}) {
   const { currentReadingBooks, setCurrentReadingBooks } = useContext(currentReadingContext);

   const booksRef = useRef();

   const handleClickBook = (e) => {
      if (e.target.nextElementSibling.style.bottom === "-1.8rem") {
         e.target.nextElementSibling.style.bottom = "1.8rem";
      } else {
         for (let child of booksRef.current.childNodes) {
            child.firstElementChild.nextElementSibling.style.bottom = "1.8rem";
         }
         e.target.nextElementSibling.style.bottom = "-1.8rem";
      }
   };

   const moveBackToCurrentReadingBooks = (e) => {
      moveBackBookAlert(darkMode).then((result) => {
         if (result.isConfirmed) {
            const MovedBook = archivedBooks.filter((bookNotes) => {
               return bookNotes.id === e.target.id;
            });
            setCurrentReadingBooks([...currentReadingBooks, ...MovedBook]);

            const movedNotes = archivedBookNotes.filter((bookNotes) => {
               return bookNotes.bookId === e.target.id;
            });
            setCurrentReadingBookNotes([...currentReadingBookNotes, ...movedNotes]);

            const nonMovedNotes = archivedBookNotes.filter((bookNotes) => {
               return bookNotes.bookId !== e.target.id;
            });
            setArchivedBookNotes(nonMovedNotes);

            const nonMovedArchivedBooks = archivedBooks.filter((bookNotes) => {
               return bookNotes.id !== e.target.id;
            });
            setArchivedBooks(nonMovedArchivedBooks);
            moveBackBookConfirm(darkMode);
         }
      });
   };

   const deleteArchivedBooks = (e) => {
      const foundNote = archivedBookNotes.filter((note) => note.bookId === e.target.id);
      if (foundNote.length) {
         deleteOneBookWithNoteAlert(darkMode).then((result) => {
            if (result.isConfirmed) {
               if (archivedBooks.length > 1) {
                  const nonDeletedBooks = archivedBooks.filter((book) => book.id !== e.target.id);
                  const nonDeletedNotes = archivedBookNotes.filter(
                     (note) => note.bookId !== e.target.id
                  );
                  setArchivedBooks(nonDeletedBooks);
                  setArchivedBookNotes(nonDeletedNotes);
               } else {
                  setArchivedBooks([]);
                  setArchivedBookNotes([]);
               }
               deleteOneItemConfirmed(darkMode, "book");
            }
         });
      } else {
         deleteOneItemAlert(darkMode, "book").then((result) => {
            if (result.isConfirmed) {
               if (archivedBooks.length > 1) {
                  const nonDeletedBooks = archivedBooks.filter((book) => book.id !== e.target.id);
                  const nonDeletedNotes = archivedBookNotes.filter(
                     (note) => note.bookId !== e.target.id
                  );
                  setArchivedBooks(nonDeletedBooks);
                  setArchivedBookNotes(nonDeletedNotes);
               } else {
                  setArchivedBooks([]);
                  setArchivedBookNotes([]);
               }
               deleteOneItemConfirmed(darkMode, "book");
            }
         });
      }
   };

   const deleteAllArchivedBooks = () => {
      if (archivedBooks.length) {
         if (archivedBookNotes.length) {
            deleteAllArchivedBooksAlert(darkMode).then((result) => {
               if (result.isConfirmed) {
                  setArchivedBooks([]);
                  setArchivedBookNotes([]);
                  deleteAllItemsConfirm(darkMode, "books");
               }
            });
         } else {
            deleteAllItemsAlert(darkMode, "books").then((result) => {
               if (result.isConfirmed) {
                  setArchivedBooks([]);
                  setArchivedBookNotes([]);
                  deleteAllItemsConfirm(darkMode, "books");
               }
            });
         }
      } else {
         notifyEmptyList(' "archived books" ');
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
      <main
         className={darkMode ? "books-archived-container dark-mode" : "books-archived-container"}
      >
         <Back darkMode={darkMode} />
         <h3 className="category-book">
            Archived Books
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllArchivedBooks}
            />
         </h3>
         <section className="display-archived-books" ref={booksRef}>
            {archivedBooks
               ? archivedBooks.map((book) => {
                    return (
                       <div key={book.id} className="books-displayed">
                          <img
                             src={book.volumeInfo.imageLinks.thumbnail}
                             alt={book.volumeInfo.title}
                             onClick={handleClickBook}
                          />
                          <div className="see-and-delete-icons">
                             <img
                                src={darkMode ? moveBackIconDarkMode : moveBackIcon}
                                alt="move back icon"
                                id={book.id}
                                onClick={moveBackToCurrentReadingBooks}
                             />
                             <Link
                                to={`/mynotes/archivedbooksnotes/${book.id}`}
                                state={{ bookId: book.id, currentBook: book }}
                             >
                                <img
                                   id={book.id}
                                   src={darkMode ? allNotesIconDarkMode : allNotesIcon}
                                   alt="show all book's note icon"
                                />
                             </Link>
                             <img
                                src={darkMode ? deleteIconDarkMode : deleteIcon}
                                alt="delete icon"
                                id={book.id}
                                onClick={deleteArchivedBooks}
                             />
                          </div>
                       </div>
                    );
                 })
               : null}
         </section>
         <Toast />
      </main>
   );
}

export default BooksArchived;
