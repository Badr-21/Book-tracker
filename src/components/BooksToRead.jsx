import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toReadBooksContext } from "../App";
import "../styles/booksToReadStyles/booksToRead.css";
import Back from "./Back";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import seeBookIcon from "../assets/see-book-icon.svg";
import seeBookIconDarkMode from "../assets/see-book-icon-darkmode.svg";

function BooksToRead({ darkMode, setBookDetails }) {
   const { setToReadBooks, toReadBooks } = useContext(toReadBooksContext);

   const SeeToReadBooks = (e) => {
      const seeBook = toReadBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setBookDetails(...seeBook);
   };

   const deleteToReadBooks = (e) => {
      if (toReadBooks.length > 1) {
         const nonDeletedBooks = toReadBooks.filter((book) => book.id !== e.target.id);
         setToReadBooks(nonDeletedBooks);
      } else {
         setToReadBooks([]);
      }
   };

   const deleteAllToReadBooks = () => {
      setToReadBooks([]);
   };

   useEffect(() => {
      if (toReadBooks) {
         localStorage.setItem("to read books", JSON.stringify(toReadBooks));
      }
   }, [toReadBooks]);

   return (
      <main className={darkMode ? "books-to-read-container dark-mode" : "books-to-read-container"}>
         <Back darkMode={darkMode} />
         <h3 className="category-book">
            To read Books
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllToReadBooks}
            />
         </h3>
         <div className="display-to-read-books">
            {toReadBooks
               ? toReadBooks.map((book) => {
                    return (
                       <div key={book.id} className="books-displayed">
                          <img
                             src={book.volumeInfo.imageLinks.thumbnail}
                             alt={book.volumeInfo.title}
                          />
                          <div className="see-and-delete-icons">
                             <Link to={`/searchedbook/${book.id}`}>
                                <img
                                   src={darkMode ? seeBookIconDarkMode : seeBookIcon}
                                   alt="see book icon"
                                   id={book.id}
                                   onClick={SeeToReadBooks}
                                />
                             </Link>
                             <img
                                src={darkMode ? deleteIconDarkMode : deleteIcon}
                                alt="delete icon"
                                id={book.id}
                                onClick={deleteToReadBooks}
                             />
                          </div>
                       </div>
                    );
                 })
               : null}
         </div>
      </main>
   );
}

export default BooksToRead;
