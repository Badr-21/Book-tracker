import "../styles/homeStyles/home.css";
import Illustration from "../assets/Illustration.svg";
import { useState, useContext } from "react";
import { darkModeContext, dataContext } from "../App";
import { Link } from "react-router-dom";

function Home() {
   const { darkMode } = useContext(darkModeContext);
   const { setData } = useContext(dataContext);
   const [query, setQuery] = useState("");
   const APP_KEY = "AIzaSyB2D5niYoZfSoxTy4WSfsBmWQR9cvpNJ9A";
   const fetchData = async () => {
      try {
         await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&key=${APP_KEY}&langRestrict=en&maxResults=40`
         )
            .then((response) => response.json())
            .then((result) => {
               console.log(result);
               const books = result.items
                  .filter((book) => book.volumeInfo.pageCount && book.volumeInfo.title)
                  .map((book) => {
                     return book.volumeInfo.title;
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
                     <input type="text" placeholder="Search for a book..." onChange={handleInput} />
                     <Link to="search">
                        <button className="search" type="submit" onClick={handleSubmit}>
                           Search
                        </button>
                     </Link>
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
      </main>
   );
}

export default Home;
