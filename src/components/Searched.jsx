import "../styles/searchStyles/searchStyles.css";
import { darkModeContext, dataContext, bookIdContext } from "../App";
import { useContext, useEffect, useState } from "react";
function Searched() {
   const { darkMode } = useContext(darkModeContext);
   const { data } = useContext(dataContext);
   const { bookId } = useContext(bookIdContext);
   const [bookDetails, setBookDetails] = useState();

   useEffect(() => {
      if (bookId) {
         const bookfiltered = data.filter((book) => {
            return book.id === bookId;
         });
         setBookDetails(...bookfiltered);
      }
   }, [bookId]);

   return (
      <main className={darkMode ? "searched-container dark-mode" : "searched-container"}>
         {bookDetails ? (
            <section className="searched-book-image">
               <img src={bookDetails.volumeInfo.imageLinks.thumbnail} alt="" />
            </section>
         ) : null}
         {bookDetails ? (
            <section className="searched-book-text">
               <h3 className="searched-title">
                  <span>Title: </span>
                  {bookDetails.volumeInfo.title}
               </h3>
               <p className="searched-authors">
                  <span>Authors: </span>
                  {bookDetails.volumeInfo.authors}
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
         ) : null}
      </main>
   );
}

export default Searched;
