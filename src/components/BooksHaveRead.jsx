import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { haveReadBooksContext } from "../App";
import "../styles/booksHaveReadStyles/booksHaveRead.css";
import Back from "./Back";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import seeBookIcon from "../assets/see-book-icon.svg";
import seeBookIconDarkMode from "../assets/see-book-icon-darkmode.svg";

function BooksHaveRead({ darkMode, setBookDetails }) {
   const { setHaveReadBooks, haveReadBooks } = useContext(haveReadBooksContext);

   const SeeHaveReadBooks = (e) => {
      const seeBook = haveReadBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setBookDetails(...seeBook);
   };

   const deleteHaveReadBooks = (e) => {
      if (haveReadBooks.length > 1) {
         const nonDeletedBooks = haveReadBooks.filter((book) => book.id !== e.target.id);
         setHaveReadBooks(nonDeletedBooks);
      } else {
         setHaveReadBooks([]);
      }
   };

   const deleteAllHaveReadBooks = () => {
      setHaveReadBooks([]);
   };

   useEffect(() => {
      if (haveReadBooks) {
         localStorage.setItem("have read books", JSON.stringify(haveReadBooks));
      }
   }, [haveReadBooks]);

   return (
      <main
         className={darkMode ? "books-have-read-container dark-mode" : "books-have-read-container"}
      >
         <Back darkMode={darkMode} />
         <h3 className="category-book">
            Have read books
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllHaveReadBooks}
            />
         </h3>
         <div className="display-have-read-books">
            {haveReadBooks
               ? haveReadBooks.map((book) => {
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
                                   onClick={SeeHaveReadBooks}
                                />
                             </Link>
                             <img
                                src={darkMode ? deleteIconDarkMode : deleteIcon}
                                alt="delete icon"
                                id={book.id}
                                onClick={deleteHaveReadBooks}
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

export default BooksHaveRead;
