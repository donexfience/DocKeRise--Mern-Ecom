import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { config } from "../../../Common/configurations";
import { URL, commonRequests } from "../../../Common/api";
import toast from "react-hot-toast";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners"

const OTPEmailSection = ({ email, setEmail, setEmailSec, setOTPSec }) => {
  const override = css`
  display: block;
  margin: 0 auto;
`;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    console.log("email forgott")
    e.preventDefault();
    if (email.trim() === "") {
      setError("Enter an email to continue");
      return;
    }
    setLoading(true);
    try {
      const response = await commonRequests(
        "POST",
        "auth/forget-password",
        { email },
        config
      );
      console.log('=======',response)
      const { data } = response;
      console.log(data,'--------------------')
      if (response.success) {
        console.log("success from forget email")
        setEmailSec(false);
        setOTPSec(true);
        setLoading(false);
        toast.success("Email verification success");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error); // Displaying error message as a toast
      } else {
        setError("An error occurred. Please try again."); // Fallback error message
      }
      setLoading(false);
    }
  };
  return (
    <>
      <p className="mt-3 mb-4">
        <label htmlFor="username">Email Address</label>
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg">
          <div>
            <AiOutlineMail className="text-xl" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="appearance-none block w-full bg-white text-black border-b border-gray-300 py-2 pl-3 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="text-center">
          <button
             className="bg-violet-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-400 w-full"
            onClick={handleEmailSubmit}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader
                css={override}
                size={30}
                color={"#ffffff"}
                loading={true}
              />
            ) : (
              "Verify Email"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPEmailSection;
