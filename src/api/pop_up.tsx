import { toast } from "react-toastify";

export function success_pop_up(message: string) {
  toast.success(message, {
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