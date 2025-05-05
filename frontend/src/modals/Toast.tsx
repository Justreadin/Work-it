import { FaExclamationCircle, FaCheckDouble } from "react-icons/fa";

import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store/globalStor";
import { useEffect, useState } from "react";
import { toastActions } from "../store/toastSlice";

const Toast = () => {
  const { success, message } = useSelector((state: RootStore) => state?.toast);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const interval =  setInterval(() => {
        setOpen(false);
        dispatch(toastActions.showToast({ message: "", success: false }));
      }, 20000);
     if (message !== "" && (success || !success)) {
      setOpen(true);
      return clearInterval(interval)
    }
  }, [message]);

  return (
    <div
      className={`p-3 absolute ${
        open ? "top-[1rem]" : "top-[-7rem]"
      } toast right-4 h-12 w-[90%] md:w-[40%] bg-slate-300 rounded-lg ease-linear duration-200`}
    >
      <div className="flex items-center gap-2">
        {success ? (
          <FaCheckDouble className="text-teal-600 font-bold text-2xl" />
        ) : (
          <FaExclamationCircle className="text-red-500 text-2xl font-bold" />
        )}
        <span
          className={`text-${
            success ? "teal-600" : "red-500"
          } font-semibold text-base`}
        >
          {" "}
          {message}
        </span>
      </div>
    </div>
  );
};
export default Toast;
