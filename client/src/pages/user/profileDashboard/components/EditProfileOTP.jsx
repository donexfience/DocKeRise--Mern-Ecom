import { interval } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const EditProfileOTP = ({ otp, isOTPVerified, setOTP, verifyOTP }) => {
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          toast.error("OTP Expired");
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
  return (
    <div>
      <p className="font-bold">
        Check your email OTP is send{" "}
        {!isOTPVerified && (
          <span
            className={`border-2 px-3 font-bold ${
              minutes < 3 ? "text-red-500" : "text-black"
            } `}
          >
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        )}
      </p>
      <div className="">
        <div className="flex p-3 gap-3 items-center">
          {isOTPVerified ? <TiTick /> : <FaLock />}
          <input
            className="w-full border-b "
            type="number"
            name="otp"
            id="otp"
            placeholder="enter your otp here"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            disabled={isOTPVerified}
          />
          <button
            className="bg-violet-500 px-3 py-2 rounded-md text-white"
            onClick={()=>verifyOTP()}
            type="button"
            disabled={isOTPVerified}
          
          >
          {isOTPVerified ? "verified" :"verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileOTP;
