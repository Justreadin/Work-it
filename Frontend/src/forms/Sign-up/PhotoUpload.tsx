import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../../index.css";

const PhotoUpload: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // In PhotoUpload.tsx
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!image) {
      setError("Please upload an image before proceeding.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", "12345"); // Replace this with the actual user ID.

      const response = await fetch("https://localhost:5600/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect the user to the next page.
        navigate("/gigs");
      } else {
        setError(data.message || "Failed to upload the photo. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while uploading the photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="relative w-full p-5">
        <div className="absolute -top-3 md:top-0 right-[10%]">
          <NavLink
            to="/after-login"
            className="py-2.5 px-6 rounded-3xl bg-white_gray text-dark_purple font-bold"
          >
            Skip
          </NavLink>
        </div>
        <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">
          WELCOME<span> JAMES</span> to ****
        </h2>
        <p className="text-dark_gray mt-6 opacity-80 text-center text-xl md:text-4xl">
          Our gift for you to make it
        </p>

        <div className="flex flex-col items-center">
          <ul className="space-y-6 my-6">
            {[
              "Upload a professional Picture... Clients judge by what they see",
              "Opportunities come up every second, always stay updated",
              "Update your interest to fit in what you can do easily, to avoid struggle",
            ].map((item, index) => {
              return (
                <li key={index} className="flex items-center space-x-4">
                  <FaCheckCircle className="text-customPurple" />
                  <span className="text-base text-dark_gray opacity-80">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ringbg w-56 h-40 mx-auto relative flex justify-center">
          <form onSubmit={(e) => handleSubmit(e)} className="absolute top-32 w-full">
            <label
              htmlFor="image"
              className="px-4 w-full block py-2 hover:cursor-pointer rounded-3xl font-bold bg-white_gray border-dark_purple border-2 text-dark_purple"
            >
              Upload profile picture
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => handleChange(e)}
              className="hidden w-full"
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
            <button
              disabled={!image || isLoading}
              className={`text-dark_purple w-full opacity-80 hover:cursor-pointer text-center mt-6 py-2 font-bold text-base ${
                isLoading ? "opacity-60" : ""
              }`}
            >
              {isLoading ? "Uploading..." : "Let's Go"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
