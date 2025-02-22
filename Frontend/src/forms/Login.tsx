import React, { useEffect, useRef, useState } from "react";
import image from "../assets/Images/image (2).jpg";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ mail: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const isValidEmail = (email: string): boolean => {
    // Simple email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    // Password should be at least 8 characters, contain both letters and numbers, and allow special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]{8,}$/;
    return passwordRegex.test(password);
  };

  // Redirect the user to the Google auth endpoint
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5600/auth/google";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit

    // Validate email and password
    if (!isValidEmail(formData.mail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long and contain both letters and numbers.");
      return;
    }

    setIsSubmitting(true); // Prevent further submissions while processing

    try {
      console.log("Form Data Submitted:", formData);
      const response = await fetch("http://localhost:5600/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Login request failed with status:", response.status, errorText);
        throw new Error(`Invalid login credentials. Status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("Login Response Data:", data);
    
      // Store the authToken
      localStorage.setItem("authToken", data.token);
    
      // Store user details with a default role of "user"
      const user = data.user || {}; // Ensure user object exists
      localStorage.setItem("userId", user.id || "");
      localStorage.setItem("username", user.username || "");
      localStorage.setItem("role", user.role || "user"); // Default role is "user"
      // Store email in localStorage for later use in personal information
      localStorage.setItem("userEmail", formData.mail);
      // Redirect to the dashboard
      window.location.href = "/overview"; // Adjust route as needed
    } catch (err: any) {
      // Check if the error is a network error
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        setErrorMessage("Network error: Unable to connect to the backend server.");
        console.error("Network error:", err);
      } else {
        setErrorMessage(err.message || "An error occurred");
        console.error("Login error:", err);
      }
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="w-full md:w-[45%] p-[5%] md:p-16 ">
        <div>
          <NavLink className="text-base font-normal text-dark_gray opacity-80" to="/">
            Back
          </NavLink>

          {/* Form UI starts here */}
          <div className="w-full px-0 md:px-10 mt-12 md:mt-24 space-y-5">
            <div className="space-y-10">
              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="flex rounded-3xl py-3 items-center justify-center space-x-4 border-2 w-full"
              >
                <FaGoogle /> <span>Continue with Google</span>
              </button>
              <hr />
            </div>

            <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="w-full">
                <label htmlFor="mail">
                  Email<span className="text-red-500 text-2xl">*</span>
                </label>
                <input
                  className="w-full border-2 rounded-3xl focus:border-gray-400 focus:outline-customPurple py-2.5 px-3"
                  type="text"
                  ref={inputRef}
                  name="mail"
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Password */}
              <div className="w-full relative">
                <label htmlFor="password">
                  Password<span className="text-red-500 text-2xl">*</span>
                </label>
                <input
                  className="w-full border-2 rounded-3xl focus:border-gray-400 focus:outline-customPurple py-2.5 px-3"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
                <span
                  onClick={handleViewPassword}
                  className="text-dark_gray opacity-80 text-2xl absolute right-2 top-12 hover:cursor-pointer"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                <br />
                <NavLink className="block text-dark_gray opacity-80 text-base font-normal mt-4" to="/forgot-password">
                  Forgot password?
                </NavLink>
              </div>

              {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

              <button
                className="py-2.5 px-4 bg-dark_purple rounded-3xl text-white w-full md:w-[50%] mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
            <div>
              <p className="mt-6 md:mt-24 text-base text-dark_gray text-center opacity-80">
                Don't have an account?{" "}
                <NavLink className="text-[#2075FF]" to="/sign-up">
                  Click here
                </NavLink>{" "}
                to create an account
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-1 w-full">
        <img className="h-full w-full" src={image} alt="" />
      </div>
    </div>
  );
};

export default Login;
