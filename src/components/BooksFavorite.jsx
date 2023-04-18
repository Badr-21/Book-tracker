import { useContext, useEffect } from "react";
import { favoriteBooksContext } from "../App";

function BooksFavorite() {
   const { favoriteBooks } = useContext(favoriteBooksContext);
   useEffect(() => {
      if (favoriteBooks) {
         console.log(favoriteBooks);
      } else console.log("no");
   });
   return (
      <main className="books-have-read-container">
         <p>Favorite books</p>
         {favoriteBooks
            ? favoriteBooks.map((book) => {
                 return (
                    <img
                       key={book.id}
                       src={book.volumeInfo.imageLinks.thumbnail}
                       alt={book.volumeInfo.title}
                    />
                 );
              })
            : null}
      </main>
   );
}

export default BooksFavorite;
