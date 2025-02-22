import React, { useState, useRef, useEffect } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";

interface MailVerificationProps {
  email: string;
}

// Utility function to mask the email for display (shows first 3 characters of local part)
const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visiblePart = local.substring(0, 3);
  return `${visiblePart}*****@${domain}`;
};

const MailVerification: React.FC<MailVerificationProps> = ({ email }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  // Start the resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Focus the first OTP input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isComplete = otp.every((item) => item !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!isComplete) {
      setError("Please fill in all OTP fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5600/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // using "email" as expected by the backend
          otpEntered: otp.join(""),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/sign-upprofile");
      } else {
        setError(data.message || "OTP verification failed.");
      }
    } catch (err) {
      setError("An error occurred while verifying the OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const value = e.target.value;
    // Only allow numeric input (or empty string)
    if (value && isNaN(Number(value))) return;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[i] = value;
      return newOtp;
    });

    // Move focus to the next input if available
    if (value && i < otp.length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    // Only allow resend if timer has expired
    if (resendTimer > 0) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5600/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // sending the email for OTP generation
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Reset the timer and clear the OTP fields upon successful resend
        setResendTimer(60);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setError(data.message || "Resend OTP failed.");
      }
    } catch (err) {
      setError("An error occurred while resending the OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden absolute top-0 left-0 flex items-center justify-center transparent_bg z-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-96 flex flex-col items-center space-y-5"
      >
        <p className="text-center text-dark_gray">
          A verification code has been sent to{" "}
          <strong>{maskEmail(email)}</strong>. Input it here to continue.
        </p>
        <div className="flex space-x-2 text-center">
          {otp.map((item, index) => (
            <input
              key={index}
              value={item}
              maxLength={1}
              ref={(input) => (inputRefs.current[index] = input)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e, index)}
              className="h-12 w-11 border-2 text-center text-dark_purple font-semibold focus:outline-dark_purple"
              type="text"
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
        <button
          disabled={!isComplete || isLoading}
          className={`bg-dark_purple py-2.5 text-white w-40 rounded-3xl ${
            isComplete && !isLoading ? "opacity-100" : "opacity-60"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
        <div className="mt-4">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend code in {resendTimer} second{resendTimer !== 1 && "s"}.
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-500 underline"
              disabled={isLoading}
            >
              Resend Code
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MailVerification;
