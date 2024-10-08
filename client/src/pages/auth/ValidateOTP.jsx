import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Common/api";
import { updateUserOnOTPValidation } from "../../redux/reducers/user/userSlice";
import { config } from "../../Common/configurations";

const ValidateOTP = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input=${index + 1}`).focus();
    }
    setOtp(updatedOtp);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let otpNumber = parseInt(otp.join(""));
    if (otpNumber.toString().split("").length < 6) {
      setError("OTP is not Valid");
      return;
    } else {
      setError("");
    }
    setLoading(true);
    await axios
      .post(
        `${URL}/auth/validate-otp`,
        { otp: otpNumber },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((data) => {
        setLoading(false);
        navigate("/");
        dispatch(updateUserOnOTPValidation(data.data.user));
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
    useEffect(() => {
      const generateOTP = async () => {
        try {
          const response = await commonRequests(
            "GET",
            "/auth/send-otp",
            null,
            config
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error sending OTP:", error);
        }
      };
      if (user) {
        if (user.isEmailVerified) {
          navigate("/");
        } else {
          generateOTP();
        }
      } else {
        generateOTP();
      }
    }, [user]);
    const [minutes, setMinutes] = useState(4);
    const [seconds, setSeconds] = useState(59);

    const [resendSeconds, setResendSeconds] = useState(30);
    const [resendLoading, setResendLoading] = useState(false);
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            toast.error("OTP Expired");
            setOTPExpired(true);
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

    const handleResending = async () => {
      if (resendSeconds === 0) {
        setResendLoading(true);
        await axios
          .post(
            `${URL}/auth/resend-otp`,
            {
              email: "aodifajio",
            },
            config
          )
          .then(({ data }) => {
            if (data.success) {
              toast.success(data.message);
              setResendLoading(false);
            }
          })
          .catch(({ response }) => {
            setError(response.data.error);
            toast.error(response.data.error);
            setResendLoading(false);
          });

        setResendSeconds(30);
      } else {
        toast.error(
          `Please wait ${resendSeconds} seconds before resending OTP`
        );
      }
    };

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

    return (
      <div className="flex justify-center items-center h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h1 className="text-lg font-semibold">
              Please verify email to continue
            </h1>
            <p className="mb-5">A OTP is sent to your email</p>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter OTP:
            </label>
            <div className="flex justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  className="appearance-none border w-12 py-2 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
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
            <p>
              OTP will expire in{" "}
              <span className="px-2 border border-gray-500 rounded">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
          </div>
          {error && <p>{error}</p>}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Loading..." : " Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    );
  };
};

export default ValidateOTP;
