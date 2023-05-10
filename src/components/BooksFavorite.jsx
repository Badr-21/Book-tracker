import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { favoriteBooksContext } from "../App";
import "../styles/booksFavoriteStyles/bookFavorite.css";
import Back from "./Back";
import deleteIcon from "../assets/delete-Icon.svg";
import deleteIconDarkMode from "../assets/delete-icon-darkmode.svg";
import deleteAllIcon from "../assets/delete-all-icon.svg";
import deleteAllIconDarkMode from "../assets/delete-all-icon-darkmode.svg";
import seeBookIcon from "../assets/see-book-icon.svg";
import seeBookIconDarkMode from "../assets/see-book-icon-darkmode.svg";

function BooksFavorite({ darkMode, setBookDetails }) {
   const { setFavoriteBooks, favoriteBooks } = useContext(favoriteBooksContext);

   const SeeFavoriteBooks = (e) => {
      const seeBook = favoriteBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setBookDetails(...seeBook);
   };

   const deleteFavoriteBooks = (e) => {
      if (favoriteBooks.length > 1) {
         const nonDeletedBooks = favoriteBooks.filter((book) => book.id !== e.target.id);
         setFavoriteBooks(nonDeletedBooks);
      } else {
         setFavoriteBooks([]);
      }
   };

   const deleteAllFavoriteBooks = () => {
      setFavoriteBooks([]);
   };

   useEffect(() => {
      if (favoriteBooks) {
         localStorage.setItem("favorite books", JSON.stringify(favoriteBooks));
      }
   }, [favoriteBooks]);

   return (
      <main
         className={darkMode ? "books-favorite-container dark-mode" : "books-favorite-container"}
      >
         <Back darkMode={darkMode} />
         <h3 className="category-book">
            Favorite books
            <img
               src={darkMode ? deleteAllIconDarkMode : deleteAllIcon}
               alt="delete all icon"
               onClick={deleteAllFavoriteBooks}
            />
         </h3>
         <div className="display-favorite-books">
            {favoriteBooks
               ? favoriteBooks.map((book) => {
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
                                   onClick={SeeFavoriteBooks}
                                />
                             </Link>
                             <img
                                src={darkMode ? deleteIconDarkMode : deleteIcon}
                                alt="delete icon"
                                id={book.id}
                                onClick={deleteFavoriteBooks}
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

export default BooksFavorite;
