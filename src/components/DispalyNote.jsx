import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/displayNoteStyles/displayNote.css";
function DisplayNote({ currentBook, allNotes, bookId }) {
   const [displayNote, setDispalyNote] = useState();
   useEffect(() => {
      if (currentBook) {
         localStorage.setItem(`all notes`, JSON.stringify(allNotes));
      }
      const notes = allNotes.filter((note) => {
         return note.bookId === bookId;
      });
      setDispalyNote(notes);
   }, [currentBook, allNotes]);
   return (
      <section className="display-note-container">
         {displayNote ? (
            <div>
               <p className="number-of-notes">
                  {displayNote.length
                     ? "Notes (" + displayNote.length + ")"
                     : "You do not have any note for this book"}
               </p>
               {displayNote.length ? (
                  <div className="last-note">
                     <div className="last-note-date-page">
                        Last note
                        <p>{displayNote[displayNote.length - 1].date}</p>
                        <p>Page {displayNote[displayNote.length - 1].page}</p>
                     </div>
                     <p className="last-note-text">{displayNote[displayNote.length - 1].text}</p>
                     <Link>Edit/See all notes</Link>
                  </div>
               ) : null}
            </div>
         ) : null}
      </section>
   );
}

export default DisplayNote;
