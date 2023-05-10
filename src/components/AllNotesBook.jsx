import Back from "./Back";
import "../styles/allNotesBook/allNotesBook.css";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import noteEditIcon from "../assets/note-edit-icon.svg";
import noteEditIconDarkMode from "../assets/note-edit-icon-darkmode.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function AllNotesBook({ darkMode, allNotes, setAllNotes }) {
   const [edited, setEdited] = useState();
   const [editedText, setEditedText] = useState("");
   const [singleBookNotes, setSingleBookNotes] = useState();
   const [charactersLeft, setCharactersLeft] = useState(350);
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

   const deleteAllNotesfromSingleBookNotes = (e) => {
      const nonDeletedNotes = allNotes.filter((note) => note.bookId !== e.target.id);
      setAllNotes(nonDeletedNotes);
   };

   const handleEditClick = (e) => {
      const nonEditedNotes = allNotes.filter((note) => note.id !== e.target.id);
      nonEditedNotes.map((note) => (note.editing ? (note.editing = false) : note.editing));
      const editedNote = allNotes.filter((note) => note.id === e.target.id);
      editedNote[0].editing = true ? (editedNote[0].editing = true) : editedNote[0].editing;
      setEdited(...editedNote);
      allNotes.map((note) => (note.id === editedNote[0].id ? (note = editedNote[0]) : note));
      setAllNotes(allNotes);
   };

   const handlEditedTextAndCharactersCount = (e) => {
      setEditedText(e.target.value);
      if (e.target.value.length - editedText.length === 1) {
         setCharactersLeft((charactersLeft) => charactersLeft - 1);
      } else if (e.target.value.length - editedText.length === -1) {
         setCharactersLeft((charactersLeft) => charactersLeft + 1);
      } else {
         setCharactersLeft(350 - e.target.value.length);
      }
   };

   const handleSaveEdited = (e) => {
      e.preventDefault();
      edited.text = editedText;
      allNotes.map((note) => (note.editing ? (note.editing = false) : note.editing));
      setEdited(null);
   };

   const handleCancelEdited = (e) => {
      e.preventDefault();
      allNotes.map((note) => (note.editing ? (note.editing = false) : note.editing));
      setEdited(null);
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
   }, [allNotes, edited]);

   useEffect(() => {
      allNotes.map((note) => (note.editing ? (note.editing = false) : note.editing));
      setEdited(null);
   }, [window.reloadPage]);

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
            {singleBookNotes ? (
               <h3 className="Delete-all-book-notes">
                  All book's notes
                  <img
                     id={singleBookNotes[0].bookId}
                     src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
                     alt="delete all icon"
                     onClick={deleteAllNotesfromSingleBookNotes}
                  />
               </h3>
            ) : null}
            <section className="filtered-book-notes">
               {singleBookNotes ? (
                  singleBookNotes.map((note) => {
                     return (
                        <div key={note.id} className="filtered-note">
                           <div className="filtered-note-date-and-page">
                              <p className="filtered-note-date">{note.date}</p>
                              <p className="filtered-note-time">{note.time}</p>
                              <p className="filtered-note-page">page {note.page}</p>
                           </div>
                           <div className="edit-and-delete">
                              <img
                                 id={note.id}
                                 src={darkMode ? noteEditIconDarkMode : noteEditIcon}
                                 alt="note edit icon"
                                 onClick={handleEditClick}
                              />
                              <img
                                 id={note.id}
                                 src={darkMode ? deleteIconDarkMode : deleteIcon}
                                 alt="delete icon"
                                 onClick={deleteNotefromSingleBookNotes}
                              />
                           </div>
                           {note.editing ? (
                              <form>
                                 <textarea
                                    className="textarea-edited-note"
                                    maxLength="350"
                                    onChange={handlEditedTextAndCharactersCount}
                                 ></textarea>
                                 <div className="characters-and-buttons">
                                    <p className="characters">
                                       Characters left <span>{charactersLeft}</span>
                                    </p>
                                    <div className="save-and-cancel">
                                       <button onClick={handleSaveEdited}>Save</button>
                                       <button onClick={handleCancelEdited}>Cancel</button>
                                    </div>
                                 </div>
                              </form>
                           ) : (
                              <div className="filtered-note-text">{note.text}</div>
                           )}
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
