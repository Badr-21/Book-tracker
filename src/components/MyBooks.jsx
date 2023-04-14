import BookReadingNowIcon from "../assets/book-reading-now-icon.svg";
import BookReadingNowIconDarkMode from "../assets/book-reading-now-icon-darkmode.svg";
import FavoriteBookIcon from "../assets/favorite-book-icon.svg";
import FavoriteBookIconDarkMode from "../assets/favorite-book-icon-darkmode.svg";
import BookToReadIcon from "../assets/book-to-read-icon.svg";
import BookToReadIconDarkMode from "../assets/book-to-read-icon-darkmode.svg";
import BookHaveReadIcon from "../assets/book-have-read-icon.svg";
import BookHaveReadIconDarMode from "../assets/book-have-read-icon-darkmode.svg";
import "../styles/myBooksStyles/myBooks.css";
import { Link } from "react-router-dom";
import { darkModeContext } from "../App";
import { useContext } from "react";
function MyBooks() {
   const { darkMode } = useContext(darkModeContext);
   return (
      <main className={darkMode ? "mybooks-container darkmode" : "mybooks-container"}>
         <section className="books-categories">
            <nav className="mybooks-nav">
               <ul>
                  <li>
                     <Link className="book-category" to="booksreadingnow">
                        <img
                           src={darkMode ? BookReadingNowIconDarkMode : BookReadingNowIcon}
                           alt="book reading now icon"
                        />
                        <p>Reading Now</p>
                     </Link>
                  </li>
                  <li>
                     <Link className="book-category" to="favoritebooks">
                        <img
                           src={darkMode ? FavoriteBookIconDarkMode : FavoriteBookIcon}
                           alt="favorite book icon"
                        />
                        <p>Favorite</p>
                     </Link>
                  </li>
                  <li>
                     <Link className="book-category" to="bookstoread">
                        <img
                           src={darkMode ? BookToReadIconDarkMode : BookToReadIcon}
                           alt="book to read icon"
                        />
                        <p>To Read</p>
                     </Link>
                  </li>
                  <li>
                     <Link className="book-category" to="bookshaveread">
                        <img
                           src={darkMode ? BookHaveReadIconDarMode : BookHaveReadIcon}
                           alt="bood have read icon"
                        />
                        <p>Have Read</p>
                     </Link>
                  </li>
               </ul>
            </nav>
         </section>
         <section className="books-display-data"></section>
      </main>
   );
}

export default MyBooks;
