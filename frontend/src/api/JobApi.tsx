import axios from "axios";
import { Gig } from "../type";

let baseUrl = import.meta.env.VITE_API_BASE_URL;
export const useGetGig = (id: string, token: string) => {
  const getGigById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/gig/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data as Gig;
      return {
        data,
        success: true,
      };
    } catch (err) {
      // Type guard for AxiosError
      if (axios.isAxiosError(err)) {
        if (err.response) {
          throw new Error(err.response.data?.message || err.message);
        } else if (err.request) {
          throw new Error(
            "No response received from server. Please check your network connection."
          );
        } else {
          throw new Error(`Error setting up the request: ${err.message}`);
        }
      } else if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        // Fallback for any other unknown error type
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  return {
    getGigById,
  };
};

export const useGetGigList = (token: string) => {
  const getGigList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/gig`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        success: true,
        data: response.data as Gig[],
      };
    } 
    catch (err){
      if (axios.isAxiosError(err)) {
        if (err.response) {
          throw new Error(err.response.data?.message || err.message);
        } else if (err.request) {
          throw new Error(
            "No response received from server. Please check your network connection."
          );
        } else {
          throw new Error(`Error setting up the request: ${err.message}`);
        }
      } else if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        // Fallback for any other unknown error type
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  return {
    getGigList,
  };
};
