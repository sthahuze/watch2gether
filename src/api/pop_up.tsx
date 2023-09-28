import { toast } from "react-toastify"; // Importing the toast notifications library.

// Function to display a success pop-up message.
export function success_pop_up(message: string) {
  toast.success(message, {
    position: "top-right", // Position of the toast notification.
    autoClose: 1500, // Time in milliseconds for the notification to auto-close.
    hideProgressBar: true, // Whether to hide the progress bar.
    closeOnClick: true, // Whether clicking the toast closes it.
    pauseOnHover: false, // Whether hovering over the toast pauses auto-close.
    draggable: false, // Whether the toast is draggable.
    progress: undefined, // Custom progress indicator (not used here).
    theme: "colored", // Custom theme for the toast.
  });
}

// Function to display an info pop-up message.
export function info_pop_up(message: string) {
  toast(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}

// Function to display an error pop-up message.
export function error_pop_up(message: string) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}
