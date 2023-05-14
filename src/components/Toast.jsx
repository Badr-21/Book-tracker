import toast, { Toaster } from "react-hot-toast";

export const notifyAlreadyAdded = (category) =>
   toast(`Already added to ${category}`, { duration: 1250 });
export const notifySuccessfullyAdded = (category) =>
   toast.success(`Added to ${category}`, { duration: 1250 });
export const notifySuccessfullySaved = () =>
   toast.success("Successfully saved", { duration: 1250 });
export const notifySuccessfullyEdited = () =>
   toast.success("Successfully edited", { duration: 1250 });
export const notifyAlreadyArchivedBook = () => toast(`This book is archived`, { duration: 1250 });
export const notifyDeniedArchiving = () =>
   toast(`Can not archive a book with 0 note`, { duration: 1250 });
export const notifyEmptyList = (categoryList) =>
   toast(`The ${categoryList} list is empty`, { duration: 1250 });

function Toast({ darkMode }) {
   return (
      <>
         <Toaster
            toastOptions={
               !darkMode
                  ? {
                       style: {
                          padding: " 1rem",
                          fontWeight: "bold",
                          color: "#ffffff",
                          backgroundColor: "#003147",
                          textAlign: "center",
                       },
                       success: {
                          iconTheme: {
                             primary: "#ffffff",
                             secondary: "#003147",
                          },
                       },
                    }
                  : {
                       style: {
                          padding: " 1rem",
                          fontWeight: "bold",
                          color: "#1f1f1f",
                          backgroundColor: "#66b8ff",
                          textAlign: "center",
                       },
                       success: {
                          iconTheme: {
                             primary: "#1f1f1f",
                             secondary: "#66b8ff",
                          },
                       },
                    }
            }
         />
      </>
   );
}

export default Toast;
