import Back from "./Back";
import "../styles/allNotesBook/allNotesBook.css";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import noteEditIcon from "../assets/note-edit-icon.svg";
import noteEditIconDarkMode from "../assets/note-edit-icon-darkmode.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function AllNotesBook({ darkMode, allNotes, setAllNotes }) {
   const [singleBookNotes, setSingleBookNotes] = useState();
   const location = useLocation();

   const deleteNotefromSingleBookNotes = (e) => {
      let nonDeletedNotes;
      if (singleBookNotes.length > 1) {
         nonDeletedNotes = allNotes.filter((note) => note.id !== e.target.id);
         setAllNotes(nonDeletedNotes);
      } else {
         nonDeletedNotes = allNotes.filter((note) => note.bookId !== location.state.bookId);
         setAllNotes(nonDeletedNotes);
         setSingleBookNotes(null);
      }
   };

   useEffect(() => {
      if (allNotes) {
         const filteredNotes = allNotes.filter((note) => {
            return note.bookId === location.state.bookId;
         });
         if (filteredNotes.length) {
            setSingleBookNotes(filteredNotes);
         } else {
            setSingleBookNotes(null);
         }
         localStorage.setItem("all notes", JSON.stringify(allNotes));
      }
   }, [allNotes]);

   return (
      <main
         className={darkMode ? "all-notes-book-container dark-mode" : "all-notes-book-container"}
      >
         <Back darkMode={darkMode} />
         <article>
            {location.state.currentBook ? (
               <section className="filtered-book-info">
                  <div className="filtered-book-image">
                     <img
                        src={location.state.currentBook.volumeInfo.imageLinks.thumbnail}
                        alt={`${location.state.currentBook.volumeInfo.title} cover`}
                     />
                  </div>
                  <div className="filtered-book-text">
                     <p className="filtered-book-title">
                        <span>Title: </span>
                        {location.state.currentBook.volumeInfo.title}
                     </p>
                     <p className="filtered-book-authors">
                        <span>Authors: </span>
                        {location.state.currentBook.volumeInfo.authors.map(
                           (author) => `${author} `
                        )}
                     </p>
                     <p className="filtered-book-plublisher">
                        <span>Publisher: </span>
                        {location.state.currentBook.volumeInfo.publisher}
                     </p>
                     <p className="filtered-book-plublished-date">
                        <span>Published date: </span>
                        {location.state.currentBook.volumeInfo.publishedDate}
                     </p>
                     <p className="filtered-book-plublished-page">
                        <span>Pages: </span>
                        {location.state.currentBook.volumeInfo.pageCount}
                     </p>
                  </div>
               </section>
            ) : null}
            <section className="filtered-book-notes">
               {singleBookNotes ? (
                  singleBookNotes.reverse().map((note) => {
                     return (
                        <div key={note.id} className="filtered-note">
                           <div className="filtered-note-date-and-page">
                              <p className="filtered-note-date">{note.date}</p>
                              <p className="filtered-note-time">{note.time}</p>
                              <p className="filtered-note-page">page {note.page}</p>
                           </div>
                           <div className="filtered-note-text">{note.text}</div>
                           <div className="edit-and-delete">
                              <img
                                 src={darkMode ? noteEditIconDarkMode : noteEditIcon}
                                 alt="note edit icon"
                              />
                              <img
                                 id={note.id}
                                 src={darkMode ? deleteIconDarkMode : deleteIcon}
                                 alt="delete icon"
                                 onClick={deleteNotefromSingleBookNotes}
                              />
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <p className="no-note-found-book">
                     No note found for this book.
                     <br />
                     <br />
                     Go to the Reading now books category and write a note.
                  </p>
               )}
            </section>
         </article>
      </main>
   );
}

export default AllNotesBook;
