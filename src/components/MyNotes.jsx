import { useEffect } from "react";
import "../styles/myNotesStyles/myNotes.css";
import Back from "./Back";
import allNotesIcon from "../assets/all-notes-icon.svg";
import allNotesIconDarkMode from "../assets/all-notes-icon-darkmode.svg";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import { Link } from "react-router-dom";

function MyNotes({ allNotes, darkMode, setAllNotes }) {
   const deleteNote = (e) => {
      if (allNotes.length > 1) {
         const nonDeletedNotes = allNotes.filter((note) => note.id !== e.target.id);
         setAllNotes(nonDeletedNotes);
      } else {
         setAllNotes([]);
      }
   };

   const deleteAllNotes = () => {
      setAllNotes([]);
   };

   useEffect(() => {
      localStorage.setItem("all notes", JSON.stringify(allNotes));
   }, [allNotes]);
   return (
      <main className={darkMode ? "my-notes-container dark-mode" : "my-notes-container"}>
         <Back darkMode={darkMode} />
         <h3 className="all-notes-title">
            All notes
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllNotes}
            />
         </h3>
         <section className="all-my-notes">
            {allNotes.length ? (
               allNotes.map((note) => {
                  return (
                     <div className="book-note" key={note.id}>
                        <div className="image-infos-book-note">
                           <div className="image-book-note">
                              <img
                                 src={note.currentBook.volumeInfo.imageLinks.thumbnail}
                                 alt={note.currentBook.volumeInfo.title}
                              />
                           </div>
                           <div className="infos-book-note">
                              <p className="note-date-time">{`${note.date} ${note.time}`}</p>
                              <p className="note-page-number">
                                 Page <span>{note.page}</span>
                              </p>
                           </div>
                        </div>
                        <p className="note-text-saved">{note.text}</p>
                        <div className="show-all-and-delete">
                           <Link
                              to={`/mybooks/booksreadingnow/${note.bookId}`}
                              state={{ bookId: note.bookId, currentBook: note.currentBook }}
                           >
                              <img
                                 id={note.bookId}
                                 src={darkMode ? allNotesIconDarkMode : allNotesIcon}
                                 alt="show all book's note icon"
                              />
                           </Link>
                           <img
                              id={note.id}
                              src={darkMode ? deleteIconDarkMode : deleteIcon}
                              alt="delete icon"
                              onClick={deleteNote}
                           />
                        </div>
                     </div>
                  );
               })
            ) : (
               <p className="no-note-found">
                  No note found.
                  <br />
                  <br />
                  Go to the Reading now books category and write a note.
               </p>
            )}
         </section>
      </main>
   );
}

export default MyNotes;
