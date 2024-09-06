import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { config } from "../../../Common/configurations";
import { URL, commonRequests } from "../../../Common/api";
import { FaEnvelope, FaClock, FaCheck } from "react-icons/fa";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const OTPEnterSection = ({
  email,
  setPasswordSec,
  setOTPSec,
  setOTPExpired,
}) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  const [resendSeconds, setResendSeconds] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);

  // Saving OTP to otp variable on change
  // Saving OTP to otp variable on change
  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    const value = e.target.value;

    if (value === "") {
      // If backspace is pressed, remove the number and move back to the previous box
      updatedOtp[index] = "";
      if (index > 0) {
        updatedOtp[index - 1] = ""; // Clear the previous input field
        setOtp(updatedOtp);
        const prevIndex = index - 1;
        const prevInput = document.getElementById(`otp-input-${prevIndex}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    } else if (!isNaN(value) && value.length <= 1) {
      // Check if the input is a number
      updatedOtp[index] = value;

      if (index < otp.length - 1) {
        const nextIndex = index + 1;
        const nextInput = document.getElementById(`otp-input-${nextIndex}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }

    setOtp(updatedOtp);
  };
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text/plain");
    for (let i = 0; i < otp.length; i++) {
      if (pastedData[i] && !isNaN(pastedData[i])) {
        document.getElementById(`otp-input-${i}`).value = pastedData[i];
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[i] = pastedData[i];
          return newOtp;
        });
      }
    }
  };
  const handleOTPSumbit = async (e) => {
    e.preventDefault();
    let otpNumber = parseInt(otp.join(""));
    if (otpNumber.toString().split("").length < 6) {
      setError("OTP is invalid");
      return;
    } else {
      setError("");
    }
    setLoading(true);
    try {
      const response = await commonRequests(
        "POST",
        "auth/forget-password-validate-otp",
        { email, otp: otpNumber },
        config
      );
      if (response.success) {
        setPasswordSec(true);
        setOTPSec(false);
        setLoading(false);
      } else {
        toast.error(res.reponse.data.error);
        setError(res.response.data.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          toast.error("OTP EXPIRED");
          setOTPExpired(true);
          setOTPSec(false);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  // OTP Resend timer starting on component load
  useEffect(() => {
    const resendTimerInterval = setInterval(() => {
      if (resendSeconds > 0) {
        setResendSeconds(resendSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, [resendSeconds]);
  const handleResending = async () => {
    if (resendSeconds === 0) {
      setResendLoading(true);
      try {
        const response = await commonRequests(
          "POST",
          "auth/resend-otp",
          { email },
          config
        );
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
          setResendLoading(false);
        }
      } catch (error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
        setResendLoading(false);
      }
      setResendSeconds(30);
    } else {
      toast.error(`Please wait ${resendSeconds} seconds before resending OTP`);
    }
  };
  return (
    <>
      <p className="mb-5 font-extrabold">
        An OTP is sent to your email ({email})
      </p>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
        Enter OTP
      </label>
      <div className="flex justify-center my-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="appearance-none border border-violet-700 rounded-lg w-12 py-4 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
            maxLength="1"
            value={digit}
            placeholder="-"
            onChange={(e) => handleChange(e, index)}
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>
      <div className="my-5 flex justify-between">
        {resendLoading ? (
          <p>loading...</p>
        ) : (
          <button
            className={
              resendSeconds === 0
                ? "text-blue-500 hover:underline cursor-pointer "
                : "text-gray-500"
            }
            disabled={resendSeconds !== 0}
            onClick={handleResending}
          >
            {resendSeconds === 0
              ? "Resend OTP?"
              : `Resend OTP in ${resendSeconds}s`}
          </button>
        )}
        <p className="font-mono font-bold">
          OTP will expire in{" "}
          <span
            className="px-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaClock style={{ marginRight: "0.5rem" }} />
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
      </div>
      {error && <p className="my-2 text-red-400">{error}</p>}

      <div className="text-center">
        <button
          className="btn-blue h-12 bg-fuchsia-800 text-white w-full rounded-lg shadow-lg"
          onClick={handleOTPSumbit}
          disabled={loading}
        >
          {loading ? (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          ) : (
            "Validate OTP"
          )}
        </button>
      </div>
    </>
  );
};

export default OTPEnterSection;
