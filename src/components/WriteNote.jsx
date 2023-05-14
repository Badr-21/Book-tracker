import { useRef, useEffect, useState } from "react";
import "../styles/writeNoteStyles/writeNote.css";
import Toast, { notifySuccessfullySaved } from "./Toast";

function WriteNote({
   currentBook,
   bookId,
   darkMode,
   currentReadingBookNotes,
   setCurrentReadingBookNotes,
}) {
   const [notePage, setNotePage] = useState(0);
   const [noteText, setNoteText] = useState("");
   const [charactersLeft, setCharactersLeft] = useState(350);

   const textAreaRef = useRef();

   const handleNotePage = (e) => {
      setNotePage(e.target.value);
   };

   const handleNoteText = (e) => {
      setNoteText(e.target.value);
      if (e.target.value.length - noteText.length === 1) {
         setCharactersLeft((charactersLeft) => charactersLeft - 1);
      } else if (e.target.value.length - noteText.length === -1) {
         setCharactersLeft((charactersLeft) => charactersLeft + 1);
      } else {
         setCharactersLeft(350 - e.target.value.length);
      }
   };

   const handleSavedNote = (e) => {
      e.preventDefault();
      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const theDay = [day, month, year].join("/");

      const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const theTime = [hour, minute].join(":");

      const second = date.getSeconds();
      const millSecond = date.getMilliseconds();
      const id = `${year}${month}${day}${hour}${minute}${second}${millSecond}`;

      const note = {
         id: id,
         bookId: bookId,
         page: notePage,
         text: noteText,
         date: theDay,
         time: theTime,
         currentBook: currentBook,
         editing: false,
      };
      setCurrentReadingBookNotes([note, ...currentReadingBookNotes]);
      notifySuccessfullySaved();
   };

   useEffect(() => {
      if (currentBook) {
         setNotePage(0);
         setNoteText("");
         textAreaRef.current.value = "";
      }
   }, [currentBook]);

   return (
      <article className={darkMode ? "write-note-container dark-mode" : "write-note-container"}>
         {currentBook ? (
            <section className="current-book">
               <div className="current-book-image">
                  <img
                     src={currentBook.volumeInfo.imageLinks.thumbnail}
                     alt={currentBook.volumeInfo.title}
                  />
               </div>
               <div className="current-book-text">
                  <div className="current-book-title-and-authors">
                     <h3 className="current-book-title">{currentBook.volumeInfo.title}</h3>
                     <p className="current-book-authors">
                        {currentBook.volumeInfo.authors.map((author) => `${author} `)}
                     </p>
                  </div>
                  <form>
                     <div className="input-range">
                        <input
                           onChange={handleNotePage}
                           type="range"
                           min="0"
                           max={currentBook.volumeInfo.pageCount}
                        />
                        <p className="page-number">{`${notePage} page`}</p>
                     </div>
                     <textarea
                        ref={textAreaRef}
                        className="textarea-note"
                        onChange={handleNoteText}
                        maxLength="350"
                     />
                     <div className="characters-and-button-save">
                        <p className="characters">
                           Characters left <span>{charactersLeft}</span>
                        </p>
                        <button type="submit" onClick={handleSavedNote}>
                           Save
                        </button>
                     </div>
                  </form>
               </div>
            </section>
         ) : (
            <section className="empty-book">
               <div className="empty-book-image">
                  <p>Select a book to write a note</p>
               </div>
               <div className="empty-book-text">
                  <div className="empty-book-title-and-authors">
                     <h3 className="empty-book-title">Title</h3>
                     <p className="empty-book-authors">Authors</p>
                  </div>
                  <div className="empty-input-range">
                     <input type="range" min="0" value="0" readOnly />
                  </div>
                  <textarea
                     className="empty-textarea-note"
                     disabled
                     placeholder="You can not write or save a note because you did not select a book."
                  />
                  <div className="disabled-button-save">
                     <button type="submit" disabled>
                        Save
                     </button>
                  </div>
               </div>
            </section>
         )}
         <Toast darkMode={darkMode} />
      </article>
   );
}

export default WriteNote;
