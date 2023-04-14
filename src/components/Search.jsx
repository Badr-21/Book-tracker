import "../styles/searchStyles/searchStyles.css";
import { darkModeContext, dataContext } from "../App";
import { useContext } from "react";
function Search() {
   const { darkMode } = useContext(darkModeContext);
   const { data } = useContext(dataContext);
   return (
      <main className={darkMode ? "books dark-mode" : "books"}>
         {data
            ? data
                 .filter(
                    (book) =>
                       book.volumeInfo.pageCount &&
                       book.volumeInfo.title &&
                       book.volumeInfo.imageLinks?.thumbnail &&
                       book.volumeInfo.authors &&
                       book.volumeInfo.publishedDate &&
                       book.volumeInfo.description
                 )
                 .map((book) => {
                    return (
                       <section className="book" key={book.id}>
                          <div className="book-image">
                             <img src={book.volumeInfo.imageLinks?.thumbnail} alt="book cover" />
                          </div>
                          <div className="book-text">
                             <h4 className="title">{book.volumeInfo.title}</h4>
                             <p className="authors-and-date">{`${book.volumeInfo.authors}  ${book.volumeInfo.publishedDate}`}</p>
                             <div className="description">
                                <p className="description-text">{book.volumeInfo.description}</p>
                                <p className="see-more">See more</p>
                             </div>
                          </div>
                       </section>
                    );
                 })
            : null}
      </main>
   );
}

export default Search;
