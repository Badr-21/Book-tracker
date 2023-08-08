# Book tracker
Book tracker is my first portfolio project, it's a React CRUD app using local storage and [google books Api](https://developers.google.com/books)

![Book tracker home page](https://github.com/Badr-21/Book-tracker/blob/main/public/home-page.png)


## Usage
It's very simple, you need to search for a book and click on it, then you have the choice to add it to any of the four categories(Current reading, Favorite, To read, Have read).

In the Current reading section you can write a note, save it, and archive the book(Move it to the archived category) if you want, but then you can't add it to the Current reading category any more, until you unarchive it from the Archived category.

In Home page you can search for a book.

In My books page you have all the books stored, and all the categories where you can delete any book you want. 

In My notes page you have all the notes you have written that's include the notes from the Current reading books and the Archived books.

The notes from the Current reading books are editable and deletable whereas the notes from the Archived books are not.

There also so many details like when a book don't have any note you can't archive it, also when a book have note and you want to delete it, you will get a warning with the confirm window that indicates that the book have notes, contrary to a book with no notes, you only get the confirm window without the warning. 

## Technologies Used
- React
- SCSS
- [react-router-dom](https://reactrouter.com/en/main)
- [framer-motion](https://www.framer.com/motion/)
- [react-hot-toast](https://react-hot-toast.com/)
- [sweetalert2](https://sweetalert2.github.io/)

## Deployment:
[Book tracker live site](https://badr-21-book-tracker.netlify.app/)




