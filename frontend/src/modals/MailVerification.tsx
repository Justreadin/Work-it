import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingButton from "../ui/LoadingButton";

type Props = {
  email: string;
};
const MailVerification = ({ email }: Props) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const[loading, setLoading]=useState(false)
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const navigate = useNavigate();
  let isComplete = otp.every((item) => item !== "");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/my/user`,
        JSON.stringify({ email: email, otp: otp.join('') }),
        {
          headers:{
            'Content-Type': 'application/json'
          }
        }
         
      );
      if (response.status == 201) {
        setLoading(false)
        navigate("/login");
      }
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  const handleChange = (e: any, i: any) => {
    if (isNaN(e.target.value)) return false;
    setOtp([
      ...otp.map((data, index) => (index === i ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
    if (isComplete) {
      handleSubmit(e);
    }
  };

  let mail = email.split("@")[0].split("").slice(0,3).join('')


  const handleKeyDown = (e: any, index: any) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  return (
    <div className="w-full h-screen overflow-hidden absolute top-0 left-0 flex items-center justify-center transparent_bg z-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-[80%] md:w-96 flex flex-col items-center space-y-5"
      >
        <p className="text-center text-dark_gray">
          A verification code has been sent to{" "} {mail}****@{email.split("@")[1]}
          Input it here to continue
        </p>
        <div className="flex space-x-2 text-center">
          {otp.map((item, index) => {
            return (
              <input
                key={index}
                value={item}
                maxLength={1}
                ref={(input) => (inputRefs.current[index] = input)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleChange(e, index)}
                className="h-8 w-8 sm:w-11 sm:h-12 border-2 text-center text-dark_purple font-semibold focus:outline-dark_purple"
                type="text"
              />
            );
          })}
        </div>
        {
          loading?
          <LoadingButton/>:
          <button
          disabled={!isComplete}
          className={`bg-dark_purple py-2.5 bg-opacity-100 text-white w-40 rounded-3xl ${
            isComplete ? "opacity-100" : "opacity-60"
          }`}
        >
          Verify
        </button>
        }
       
      </form>
    </div>
  );
};

export default MailVerification;
