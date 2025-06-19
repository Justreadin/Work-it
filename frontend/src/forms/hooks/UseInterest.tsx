import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkerFormUtility } from "./Utilit";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/globalStor";

interface Interest {
  interest: string[];
  skills: string[];
  skill: string;
}
export const useInterest = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<Interest>({
    interest: [],
    skills: [],
    skill: "",
  });

  const token = useSelector((state: RootStore) => state.auth.token);

  const { personalInfor, education } = useWorkerFormUtility();

  const [error, setError] = useState({ interest: "", skills: "", post: "" });
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate("/sign-upprofile/education");
  };

  const handleNext = async () => {
    if (interests.interest.length === 0) {
      setError((prev) => {
        return { ...prev, interest: "Interest can't be empty" };
      });
      return;
    } else if (
      interests.interest.length !== 0 &&
      interests.interest.length < 5
    ) {
      setError((prev) => {
        return { ...prev, interest: "Select 5 interest atleast" };
      });
      return;
    } else if (interests.skills.length === 0 || interests.skills.length < 5) {
      setError((prev) => {
        return { ...prev, skills: "Add atleast 5 skills" };
      });
    }

    // form summission

    try {
      setLoading(true);
      const data = {
        personal_information: personalInfor,
        education,
        interest: interests.interest,
        skills: interests.skills,
      };

      console.log(data)

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/personalize`,
        data,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        navigate("/avatarupload");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError((prev) => {
            return { ...prev, post: err.response?.data.message };
          });
        } else if (err.request) {
          setError((prev) => {
            return { ...prev, post: "Network error" };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              post: `Error setting up the request: ${err.message}`,
            };
          });
        }
      } else if (err instanceof Error) {
        setError((prev) => {
          return { ...prev, post: err.message };
        });
      } else {
        setError((prev) => {
          return { ...prev, post: "Unexpected error occour" };
        });
      }
      setLoading(false);
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "skill") {
      if (error.skills !== "") {
        setError((prev) => {
          return { ...prev, skills: "" };
        });
      }
      setInterests((prev) => {
        return { ...prev, skill: e.target.value };
      });
    } else {
      const { checked, id } = e.target;

      if (error.interest !== "") {
        setError((prev) => {
          return { ...prev, interest: "" };
        });
      }
      if (checked) {
        setInterests((prev) => {
          return { ...prev, interest: [...prev.interest, id] };
        });
      } else {
        setInterests((prev) => {
          return {
            ...prev,
            interest: prev.interest.filter((item) => item !== id),
          };
        });
      }
    }
  };

  return {
    error,
    interests,
    setInterests,
    handleChange,
    handleNext,
    handleBack,
    loading,
  };
};
