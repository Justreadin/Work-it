import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginDataProp } from "../../constant/constant.type";
import axios from "axios";
import { toastActions } from "../../store/toastSlice";
import { authAction } from "../../store/authStore";

export const useLoginForm = (
  initialState: LoginDataProp,
  errorState: { mail: string; password: string }
) => {
  const [error, setError] = useState(errorState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const [formData, setFormData] = useState<LoginDataProp>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    if (error.mail !== "" || error.password !== "") {
      setError((prev) => {
        return { ...prev, [name]: "" };
      });
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("working");
    try {
      let values = Object.values(formData).filter((item) => item === "");
      if (values.length === 0) {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
          JSON.stringify({email: formData.mail, password: formData.password}),
          {
            headers:{
              'Content-Type': 'application/json'
            }

          }
        )
       
        const {accessToken, user} = response.data
        let token = accessToken as string
        let id = user._id as string
        setLoading(false)
        dispatch(authAction.setAuth({token: token, userId: id}))
        dispatch(toastActions.showToast({success: true, message: "Login successful"}))
        navigate("/gigs");
      } else {
        let newErr = { mail: "", password: "" };
        Object.keys(formData).forEach((key) => {
          let fieldKey = key as keyof LoginDataProp;
          if (
            typeof formData[fieldKey] === "string" &&
            formData[fieldKey].trim() === ""
          ) {
            newErr[fieldKey] = `${fieldKey} is required`;
      
          }
        });
        setError(newErr);
        setLoading(false);
        return;
      }
    } catch (err) {
      dispatch(toastActions.showToast({success: false, message: "Login failed"}))
      setLoading(false)
    }
  };

  return {
    handleChange,
    handleSubmit,
    error,
    loading,
  };
};

export const useSignupForm = (initialState: {
  email: string;
  password: string;
  cofirmPassword: string;
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [verifyModal, setVerifyModal] = React.useState(false);

  const handleViewPassword = (field: string) => {
    if (field === "password") {
      setShowPassword((prev) => {
        return { ...prev, password: !prev.password };
      });
    } else {
      setShowPassword((prev) => {
        return { ...prev, confirmPassword: !prev.confirmPassword };
      });
    }
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/my/intiate/user`,
        JSON.stringify({ email: formData.email, password: formData.password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);

        dispatch(
          toastActions.showToast({
            success: true,
            message: "Account creation initiation successful",
          })
        );
        setVerifyModal(true);
      }
    } catch (err) {
      dispatch(
        toastActions.showToast({
          success: false,
          message: "Account creation initiatiation failed",
        })
      );
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleViewPassword,
    loading,
    showPassword,
    verifyModal,
    formData,
  };
};
