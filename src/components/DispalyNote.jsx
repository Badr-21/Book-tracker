import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/displayNoteStyles/displayNote.css";
function DisplayNote({ currentBook, allNotes, bookId, darkMode }) {
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
      <main className={darkMode ? "display-note-container dark-mode" : "display-note-container"}>
         {currentBook ? (
            <div className="selected-book-note">
               <p className="number-of-notes">{`Notes (${displayNote.length})`}</p>
               {displayNote.length ? (
                  <div className="last-note">
                     <div className="last-note-date-page">
                        Last note
                        <p>{displayNote[0].date}</p>
                        <p>{displayNote[0].time}</p>
                        <p>Page {displayNote[0].page}</p>
                     </div>
                     <p className="last-note-text">{displayNote[0].text}</p>
                     <Link
                        state={{ bookId: bookId, currentBook: currentBook }}
                        style={
                           darkMode
                              ? { color: "#66b8ff", textDecoration: "none", cursor: "auto" }
                              : { color: "#003147", textDecoration: "none", cursor: "auto" }
                        }
                        to={bookId}
                     >
                        <p className="see-all-notes">See all notes</p>
                     </Link>
                  </div>
               ) : null}
            </div>
         ) : (
            <p className="unselected-book-note">Select a book to see if you wrote a note.</p>
         )}
      </main>
   );
}

export default DisplayNote;
