import "../styles/myNotesStyles/myNotes.css";
import { useEffect } from "react";

function MyNotes({ allNotes }) {
   useEffect(() => {
      localStorage.setItem("all notes", JSON.stringify(allNotes));
   }, [allNotes]);
   return (
      <section className="my-notes-container">
         {allNotes.length ? (
            allNotes.map((note) => {
               return (
                  <div className="book-note" key={note.id}>
                     <div className="image-book-note">
                        <img
                           src={note.currentBook.volumeInfo.imageLinks.thumbnail}
                           alt={note.currentBook.volumeInfo.title}
                        />
                     </div>
                     <div className="text-book-note">
                        <p>
                           <span>{note.date}</span>
                        </p>
                        <p>
                           Page <span>{note.page}</span>
                        </p>
                        <p>
                           <span>{note.text}</span>
                        </p>
                     </div>
                  </div>
               );
            })
         ) : (
            <p className="no-note-found">
               No note found
               <br />
               <br />
               Go to the Reading now books category and write a note.
            </p>
         )}
      </section>
   );
}

export default MyNotes;
