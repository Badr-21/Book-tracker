import toast, { Toaster } from "react-hot-toast";

export const notifyAlreadyAdded = (category) => toast(`Already added to ${category}`);
export const notifySuccessfullyAdded = (category) =>
   toast.success(`Successfully added to ${category}`);

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
