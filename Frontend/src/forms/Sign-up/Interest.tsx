import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormNavButtons from "./FormNavButtons";

const predefinedInterests = [
  "Technology", "Music", "Sports", "Health & Fitness", "Gaming", "Books", "Finance",
  "Travel", "Cooking", "Art", "Science", "Movies & TV", "Education", "Business",
  "Self-Development", "Programming", "Photography", "Fashion", "Politics", "Environment",
];

const Interest: React.FC = () => {
  const navigate = useNavigate();
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setUserInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleCustomInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInterest(e.target.value);
  };

  const addCustomInterest = () => {
    if (customInterest.trim() === "") {
      setError("Custom interest cannot be empty");
      return;
    }
    if (userInterests.includes(customInterest)) {
      setError("This interest is already selected");
      return;
    }
    setUserInterests((prev) => [...prev, customInterest]);
    setCustomInterest("");
    setError(null);
  };

  const handleBack = () => {
    navigate("/sign-upprofile/education");
  };

  const handleNext = async () => {
    if (userInterests.length === 0) {
      setError("Please select at least one interest");
      return;
    }
    try {
      const response = await fetch("https://lyrical-p6de.onrender.com/api/save-interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: userInterests }),
      });

      if (!response.ok) throw new Error("Failed to save user interests");
      const data = await response.json();
      console.log("✅ Server Response:", data.message);
      navigate("/personalized");
    } catch (error) {
      console.error("❌ API Request Failed:", error);
      alert("Failed to save interests. Please try again.");
    }
  };

  return (
    <div className="w-full md:w-[70%] pb-[5%] flex flex-col items-center">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center mb-4">
        Select Your Interests
      </h2>

      {/* Display predefined interests as selectable options */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        {predefinedInterests.map((interest) => (
          <button
            key={interest}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold 
              ${userInterests.includes(interest) ? "bg-purple-600 text-white" : "border-gray-300 text-gray-700"}`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>

      {/* Custom interest input */}
      <div className="w-full flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Add your own interest"
          value={customInterest}
          onChange={handleCustomInterestChange}
          className="border rounded-lg p-2 w-full focus:outline-purple-500"
        />
        <button
          onClick={addCustomInterest}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Add
        </button>
      </div>

      {/* Display selected interests */}
      {userInterests.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 mb-4">
          {userInterests.map((interest) => (
            <div key={interest} className="flex items-center bg-gray-200 rounded-lg px-3 py-1">
              <span className="text-sm font-medium mr-2">{interest}</span>
              <button
                onClick={() => toggleInterest(interest)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Navigation Buttons */}
      <FormNavButtons handleBack={handleBack} handleNext={handleNext} />
    </div>
  );
};

export default Interest;
