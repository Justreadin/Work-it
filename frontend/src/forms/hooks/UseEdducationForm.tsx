import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contexts/FormContext";
import { EduErrorProp, EduProp } from "../../constant/constant.type";
import { useLocationSelection } from "./UseLocationSelecvtion";

const useEduForm = () => {
  const { location, status, setSelectedLocation } =
    useLocationSelection();

  const [education, setEducation] = useState<EduProp>({
    highestDegree: "",
    nameOfSchool: "",
    startDate: "",
    endDate: "",
    schooling: false,
    schoolState: "",
    schoolCountry: "",
  });

  const [error, setErr] = useState<EduErrorProp>({
    highestDegree: "",
    nameOfSchool: "",
    startDate: "",
    endDate: "",
    schooling: false,
    schoolState: "",
    schoolCountry: "",
  });

  const selectRef = useRef<HTMLSelectElement | null>(null);
  useEffect(() => {
    selectRef.current?.focus();
  }, []);

  const formState = useForm();
  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(education);
    const { name, type, value } = e.target;
    if (name === "schoolCountry") {
      const selectedCountry = location.countries.find(
        (c) => c.isoCode === value
      );
      if (selectedCountry) {
        setEducation((prev) => {
          return { ...prev, [name]: selectedCountry.name };
        });
        setSelectedLocation((prev)=>{
            return{...prev, country: selectedCountry}
        })
      }
    } else if (name === "schoolState"){
      const selectedState = location.states.find((s) => s.isoCode === value);
      if (selectedState) {
        setEducation((prev) => {
          return { ...prev, [name]: selectedState.name };
        });
        setSelectedLocation((prev)=>{
            return{...prev, state: selectedState}
        })
      } else {
        setEducation((prev) => {
          return { ...prev, [name]: value };
        });
      }
    } else {
      setEducation((prev) => {
        return { ...prev, [name]: type !== "checkbox" ? value : true };
      });
    }

    setErr((prev) => {
      return { ...prev, [name]: "" };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
  };
  const handleNext = () => {
    let values = Object.values(education).filter((item) => item == "");
    if (values.length === 0) {
      formState?.setEducation(education);
      formState?.setFilled((prev) => {
        return { ...prev, education: true };
      });
      navigate("/sign-upprofile/interest");
    } else {
      let newErrors: EduErrorProp = {
        highestDegree: "",
        nameOfSchool: "",
        startDate: "",
        endDate: "",
        schooling: false,
        schoolState: "",
        schoolCountry: "",
      };

      Object.keys(education).forEach((key) => {
        let fieldKey = key as keyof EduProp;
        if (
          typeof education[fieldKey] === "string" &&
          !education[fieldKey].trim()
        ) {
          newErrors[fieldKey] = `${fieldKey.toLowerCase()} is required`;
        }
      });
      setErr(newErrors);
    }
  };
  const handleBack = () => {
    navigate("/sign-upprofile");
  };

  return {
    education,
    error,
    handleChange,
    handleBack,
    handleSubmit,
    handleNext,
    location,
    status,
  };
};

export default useEduForm;
