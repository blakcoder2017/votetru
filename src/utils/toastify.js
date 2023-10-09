import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toastifySuccess(successMessage) {
  const toastID = "success";
  return toast.success(successMessage, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastID,
    transition: Slide,
  });
}

export function toastifyFailure(errorMessage) {
  const toastID = "error";
  return toast.error(errorMessage, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastID,
  });
}
