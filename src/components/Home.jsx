import "../styles/homeStyles/home.css";
import Illustration from "../assets/Illustration.svg";
import searchMagnifyingGlassIcon from "../assets/search-magnifying-glass-icon.svg";
import searchMagnifyingGlassIconDarMode from "../assets/search-magnifying-glass-icon-darkmode.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ darkMode, data, setData, setBookDetails }) {
   const [query, setQuery] = useState("");

   const APP_KEY = "AIzaSyB2D5niYoZfSoxTy4WSfsBmWQR9cvpNJ9A";
   const fetchData = async () => {
      try {
         await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&key=${APP_KEY}&langRestrict=en&maxResults=40`
         )
            .then((response) => response.json())
            .then((result) => {
               const books = result.items
                  .filter((book) => book.volumeInfo.pageCount && book.volumeInfo.title)
                  .map((book) => {
                     return book;
                  });
               console.log(books);
               setData(result.items);
            });
      } catch (error) {
         console.log(error);
      }
   };

   const handleInput = (e) => {
      setQuery(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      fetchData();
   };

   const handleSeeMore = (e) => {
      console.log(e.target.dataset.id);
      console.log(e.target.id);
      const bookfiltered = data.filter((book) => {
         return book.id === e.target.id;
      });
      setBookDetails(...bookfiltered);
   };

   return (
      <main className={darkMode ? "home-container dark-mode " : "home-container"}>
         <article className="hero">
            <section className="hero-text">
               <div className="quote">
                  <h1>"If you don't like to read, you haven't found the right book."</h1>
                  <p>J.K. Rowling</p>
               </div>
               <div className="get-started">
                  <h2>Do you want to find the right book ?</h2>
                  <form className="form">
                     <div className="search-input">
                        <img
                           src={
                              darkMode
                                 ? searchMagnifyingGlassIconDarMode
                                 : searchMagnifyingGlassIcon
                           }
                           alt="search magnifying glass icon"
                        />
                        <input
                           type="text"
                           placeholder="Search for a book..."
                           onChange={handleInput}
                        />
                     </div>
                     <button className="search" type="submit" onClick={handleSubmit}>
                        Search
                     </button>
                  </form>
               </div>
            </section>
            <section className="hero-image">
               <img
                  src={Illustration}
                  alt="Illustration of three people reading books made by Storyset"
               />
            </section>
         </article>
         <article
            className={darkMode ? "books dark-mode" : "books"}
            style={data ? { paddingBottom: "1rem" } : null}
         >
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
                                <h3 className="title">{book.volumeInfo.title}</h3>
                                <p className="authors-and-date">{`${book.volumeInfo.authors.map(
                                   (author) => `${author} `
                                )}  ${book.volumeInfo.publishedDate}`}</p>
                                <p className="description">{book.volumeInfo.description}</p>
                                <Link
                                   to={`searchedbook/${book.id}`}
                                   style={{ textDecoration: "none", cursor: "auto" }}
                                >
                                   <p className="see-more" id={book.id} onClick={handleSeeMore}>
                                      See more
                                   </p>
                                </Link>
                             </div>
                          </section>
                       );
                    })
               : null}
         </article>
      </main>
   );
}

export default Home;
