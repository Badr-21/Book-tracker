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
import {
   readingNowBooksContext,
   favoriteBooksContext,
   toReadBooksContext,
   haveReadBooksContext,
} from "../App";
import { useContext } from "react";

function MyBooks({ darkMode, setBookDetails, allBooks }) {
   const { readingNowBooks } = useContext(readingNowBooksContext);
   const { favoriteBooks } = useContext(favoriteBooksContext);
   const { toReadBooks } = useContext(toReadBooksContext);
   const { haveReadBooks } = useContext(haveReadBooksContext);

   const handleSeeBook = (e) => {
      const seeBook = allBooks.filter((book) => {
         return book.id === e.target.id;
      });
      setBookDetails(...seeBook);
   };

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
               <p className="number-of-all-books">
                  All books
                  <span>
                     {` (${
                        readingNowBooks.length +
                        favoriteBooks.length +
                        toReadBooks.length +
                        haveReadBooks.length
                     })`}
                  </span>
               </p>
            </nav>
         </section>
         <section className="display-books">
            <h3 className="display-books-category">
               Reading now books<span>{` (${readingNowBooks.length})`}</span>
            </h3>
            <div className="reading-now-books">
               {readingNowBooks
                  ? readingNowBooks.map((book) => {
                       return (
                          <Link key={book.id} to={`/searchedbook/${book.id}`}>
                             <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                id={book.id}
                                onClick={handleSeeBook}
                             />
                          </Link>
                       );
                    })
                  : null}
            </div>
            <h3 className="display-books-category">
               Favorite books<span>{` (${favoriteBooks.length})`}</span>
            </h3>
            <div className="favorite-books">
               {favoriteBooks
                  ? favoriteBooks.map((book) => {
                       return (
                          <Link key={book.id} to={`/searchedbook/${book.id}`}>
                             <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                id={book.id}
                                onClick={handleSeeBook}
                             />
                          </Link>
                       );
                    })
                  : null}
            </div>
            <h3 className="display-books-category">
               To read books<span>{` (${toReadBooks.length})`}</span>
            </h3>
            <div className="to-read-books">
               {toReadBooks
                  ? toReadBooks.map((book) => {
                       return (
                          <Link key={book.id} to={`/searchedbook/${book.id}`}>
                             <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                id={book.id}
                                onClick={handleSeeBook}
                             />
                          </Link>
                       );
                    })
                  : null}
            </div>
            <h3 className="display-books-category">
               Have read books<span>{` (${haveReadBooks.length})`}</span>
            </h3>
            <div className="have-read-books">
               {haveReadBooks
                  ? haveReadBooks.map((book) => {
                       return (
                          <Link key={book.id} to={`/searchedbook/${book.id}`}>
                             <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                id={book.id}
                                onClick={handleSeeBook}
                             />
                          </Link>
                       );
                    })
                  : null}
            </div>
         </section>
      </main>
   );
}

export default MyBooks;
