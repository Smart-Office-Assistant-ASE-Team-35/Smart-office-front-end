import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { messageFromServer } from "../../Redux/Action/systemAction";

function CustomToast() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.systemReducer.notifyMessage);
  useEffect(() => {
    if (message !== "") {
      addNotification();
      dispatch(messageFromServer(""));
    }
    // eslint-disable-next-line
  }, [message]);

  const addNotification = () => {
    toast.info(message || "Something went wrong", {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default CustomToast;
