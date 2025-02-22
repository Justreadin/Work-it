import React, { useEffect, useRef, useState } from "react";
import image from "../assets/Images/Rectangle 13.jpg";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import MailVerification from "./Sign-up/MailVerification";

const SignUpOne: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    confirmPassword: "",
  });
  const [verifyModal, setVerifyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleViewPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleGoogleAuth = async () => {
    try {
      const response = await fetch("http://localhost:5600/api/auth/google");
      if (!response.ok) throw new Error("Google Authentication Failed");
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      navigate("/home");
    } catch (error) {
      console.error("Google Auth Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(formData.mail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5600/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Sign-up failed. Please try again.");
      const data = await response.json();

      // Store email in localStorage for later use in personal information
      localStorage.setItem("userEmail", formData.mail);
  
      setVerifyModal(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
    }
  };

  return (
    <>
      {verifyModal && <MailVerification email={formData.mail} />}
      <div className="flex h-screen w-full overflow-hidden">
        <div className="flex-1 p-5 md:p-16">
          <NavLink className="text-base font-normal text-dark_gray opacity-80" to="/home">
            Back
          </NavLink>
          <div className="w-full mt-24 space-y-5">
            <button
              className="flex rounded-3xl py-3 items-center justify-center space-x-4 border-2 w-full"
              onClick={handleGoogleAuth}
            >
              <FaGoogle /> <span>Continue with Google</span>
            </button>
            <hr />
            <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
              <input
                className="w-full border-2 rounded-3xl p-3"
                type="email"
                name="mail"
                value={formData.mail}
                ref={inputRef}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
              <div className="w-full relative">
                <input
                  className="w-full border-2 rounded-3xl p-3"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
                <span onClick={handleViewPassword} className="absolute right-2 top-3 cursor-pointer">
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
              <div className="w-full relative">
                <input
                  className="w-full border-2 rounded-3xl p-3"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
              {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
              <button className="py-2.5 px-4 bg-dark_purple rounded-3xl text-white w-[50%] mt-4">
                Sign Up
              </button>
            </form>
            <p className="mt-16 text-base text-dark_gray text-center opacity-80">
              Already have an account? <NavLink className="text-[#2075FF]" to="/login">Sign in</NavLink>
            </p>
          </div>
        </div>
        <div className="hidden md:block w-[55%]">
          <img className="w-full h-full" src={image} alt="Signup Visual" />
        </div>
      </div>
    </>
  );
};

export default SignUpOne;