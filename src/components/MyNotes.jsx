import "../styles/myNotesStyles/myNotes.css";
import Back from "./Back";
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";

function MyNotes({ darkMode }) {
   return (
      <motion.main
         className={darkMode ? "my-notes-container dark-mode" : "my-notes-container"}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
      >
         <Back darkMode={darkMode} />
         <div className="book-notes-selection">
            <NavLink
               className="link"
               style={
                  darkMode
                     ? ({ isActive }) => {
                          return isActive ? { backgroundColor: "#66b8ff", color: "#1f1f1f" } : {};
                       }
                     : ({ isActive }) => {
                          return isActive ? { backgroundColor: "#003147", color: "#ffffff" } : {};
                       }
               }
               to="/mynotes/currentreadingbooksnotes"
            >
               Current reading books notes
            </NavLink>
            <NavLink
               className="link"
               style={
                  darkMode
                     ? ({ isActive }) => {
                          return isActive ? { backgroundColor: "#66b8ff", color: "#1f1f1f" } : {};
                       }
                     : ({ isActive }) => {
                          return isActive ? { backgroundColor: "#003147", color: "#ffffff" } : {};
                       }
               }
               to="/mynotes/archivedbooksnotes"
            >
               archived books notes
            </NavLink>
         </div>
         <Outlet />
      </motion.main>
   );
}

export default MyNotes;
