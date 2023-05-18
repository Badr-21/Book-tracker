import { useEffect, useState } from "react";
import "../styles/displayNoteStyles/displayNote.css";
import { Link } from "react-router-dom";
function DisplayNote({ currentBook, currentReadingBookNotes, bookId, darkMode }) {
   const [displayNote, setDispalyNote] = useState();
   useEffect(() => {
      if (currentBook) {
         localStorage.setItem(
            `current reading book notes`,
            JSON.stringify(currentReadingBookNotes)
         );
      }
      const notes = currentReadingBookNotes.filter((note) => {
         return note.bookId === bookId;
      });
      setDispalyNote(notes);
   }, [currentBook, currentReadingBookNotes]);
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
                        to={`/mynotes/currentreadingbooksnotes/${bookId}`}
                     >
                        <p className="see-all-notes">See all notes</p>
                     </Link>
                  </div>
               ) : null}
            </div>
         ) : null}
      </main>
   );
}

export default DisplayNote;
