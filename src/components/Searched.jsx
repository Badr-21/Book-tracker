import BookReadingNowIcon from "../assets/book-reading-now-icon.svg";
import BookReadingNowIconDarkMode from "../assets/book-reading-now-icon-darkmode.svg";
import FavoriteBookIcon from "../assets/favorite-book-icon.svg";
import FavoriteBookIconDarkMode from "../assets/favorite-book-icon-darkmode.svg";
import BookToReadIcon from "../assets/book-to-read-icon.svg";
import BookToReadIconDarkMode from "../assets/book-to-read-icon-darkmode.svg";
import BookHaveReadIcon from "../assets/book-have-read-icon.svg";
import BookHaveReadIconDarMode from "../assets/book-have-read-icon-darkmode.svg";
import "../styles/searchStyles/searchedStyles.css";
import {
   readingNowBooksContext,
   favoriteBooksContext,
   toReadBooksContext,
   haveReadBooksContext,
} from "../App";
import { useContext, useEffect } from "react";
import Toast, { notifyAlreadyAdded, notifySuccessfullyAdded } from "./Toast";
import Back from "./Back";

function Searched({ darkMode, bookDetails, setAllBooks, allBooks }) {
   const { readingNowBooks, setReadingNowBooks } = useContext(readingNowBooksContext);
   const { favoriteBooks, setFavoriteBooks } = useContext(favoriteBooksContext);
   const { toReadBooks, setToReadBooks } = useContext(toReadBooksContext);
   const { haveReadBooks, setHaveReadBooks } = useContext(haveReadBooksContext);

   const handleReadingNowBooks = () => {
      if (readingNowBooks) {
         const foundBook = readingNowBooks.find((book) => book.id === bookDetails.id);
         if (foundBook) {
            notifyAlreadyAdded('" Reading now "');
         } else {
            setReadingNowBooks([...readingNowBooks, bookDetails]);
            notifySuccessfullyAdded('" Reading now "');
         }
      } else {
         setReadingNowBooks([...readingNowBooks, bookDetails]);
         notifySuccessfullyAdded('" Reading now "');
      }
      handleAllBooks();
   };
   const handleFavoriteBooks = () => {
      if (favoriteBooks) {
         const foundBook = favoriteBooks.find((book) => book.id === bookDetails.id);
         if (foundBook) {
            notifyAlreadyAdded('" Favorite "');
         } else {
            setFavoriteBooks([...favoriteBooks, bookDetails]);
            notifySuccessfullyAdded('" Favorite "');
         }
      } else {
         setFavoriteBooks([...favoriteBooks, bookDetails]);
         notifySuccessfullyAdded('" Favorite "');
      }
      handleAllBooks();
   };
   const handleToReadBooks = () => {
      if (toReadBooks) {
         const foundBook = toReadBooks.find((book) => book.id === bookDetails.id);
         if (foundBook) {
            notifyAlreadyAdded('" To read "');
         } else {
            setToReadBooks([...toReadBooks, bookDetails]);
            notifySuccessfullyAdded('" To read "');
         }
      } else {
         setToReadBooks([...toReadBooks, bookDetails]);
         notifySuccessfullyAdded('" To read "');
      }
      handleAllBooks();
   };
   const handleHaveReadBooks = () => {
      if (haveReadBooks) {
         const foundBook = haveReadBooks.find((book) => book.id === bookDetails.id);
         if (foundBook) {
            notifyAlreadyAdded('" Have read "');
         } else {
            setHaveReadBooks([...haveReadBooks, bookDetails]);
            notifySuccessfullyAdded('" Have read "');
         }
      } else {
         setHaveReadBooks([...haveReadBooks, bookDetails]);
         notifySuccessfullyAdded('" Have read "');
      }
      handleAllBooks();
   };
   const handleAllBooks = () => {
      if (allBooks) {
         const foundBook = allBooks.find((book) => book.id === bookDetails.id);
         if (foundBook) {
            return;
         } else {
            setAllBooks([...allBooks, bookDetails]);
         }
      } else {
         setAllBooks([...allBooks, bookDetails]);
      }
   };

   useEffect(() => {
      if (readingNowBooks) {
         localStorage.setItem("reading now books", JSON.stringify(readingNowBooks));
      }
      if (favoriteBooks) {
         localStorage.setItem("favorite books", JSON.stringify(favoriteBooks));
      }
      if (toReadBooks) {
         localStorage.setItem("to read books", JSON.stringify(toReadBooks));
      }
      if (haveReadBooks) {
         localStorage.setItem("have read books", JSON.stringify(haveReadBooks));
      }
      if (allBooks) {
         localStorage.setItem("all books", JSON.stringify(allBooks));
      }
   }, [readingNowBooks, favoriteBooks, toReadBooks, haveReadBooks]);

   return (
      <main className={darkMode ? "searched-container dark-mode" : "searched-container"}>
         <section className="back-and-add-to">
            <Back darkMode={darkMode} />
            <div className="add-to">
               <div className="add-to-reading-now">
                  <img
                     src={darkMode ? BookReadingNowIconDarkMode : BookReadingNowIcon}
                     alt="book reading now icon"
                     onClick={handleReadingNowBooks}
                  />
                  <p>add to 'reading now'</p>
               </div>
               <div className="add-to-favotie">
                  <img
                     src={darkMode ? FavoriteBookIconDarkMode : FavoriteBookIcon}
                     alt="favorite book icon"
                     onClick={handleFavoriteBooks}
                  />
                  <p>add to 'favorite'</p>
               </div>
               <div className="add-to-to-read">
                  <img
                     src={darkMode ? BookToReadIconDarkMode : BookToReadIcon}
                     alt="to read book icon"
                     onClick={handleToReadBooks}
                  />
                  <p>add to 'to read'</p>
               </div>
               <div className="add-to-have-read">
                  <img
                     src={darkMode ? BookHaveReadIconDarMode : BookHaveReadIcon}
                     alt="have read book icon"
                     onClick={handleHaveReadBooks}
                  />
                  <p>add to 'have read'</p>
               </div>
            </div>
         </section>
         {bookDetails ? (
            <article className="searched-book">
               <section className="searched-book-image">
                  <img src={bookDetails.volumeInfo.imageLinks.thumbnail} alt="" />
               </section>
               <section className="searched-book-text">
                  <h2 className="searched-title">
                     <span>Title: </span>
                     {bookDetails.volumeInfo.title}
                  </h2>
                  <p className="searched-authors">
                     <span>Authors: </span>
                     {bookDetails.volumeInfo.authors.map((author) => `${author} `)}
                  </p>
                  <p className="searched-plublisher">
                     <span>Publisher: </span>
                     {bookDetails.volumeInfo.publisher}
                  </p>
                  <p className="searched-plublished-date">
                     <span>Published date: </span>
                     {bookDetails.volumeInfo.publishedDate}
                  </p>
                  <p className="searched-plublished-date">
                     <span>Pages: </span>
                     {bookDetails.volumeInfo.pageCount}
                  </p>
                  <p className="searched-description">
                     <span>Description: </span>
                     {bookDetails.volumeInfo.description}
                  </p>
               </section>
            </article>
         ) : null}
         <Toast />
      </main>
   );
}

export default Searched;
