import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import { config } from "../../../Common/configurations";
import { URL } from "../../../Common/api";

const PasswordEnterSection = ({ email, setPasswordSec, setFinalMessage }) => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePasswordSubmit = async () => {
    if (password.trim() === "" || passwordAgain.trim() === "") {
      setError("All field are required");
    }
    if (password !== passwordAgain) {
      setError("Password doesn't match");
    }

    setLoading(true);

    await axios
      .post(
        `${URL}/auth/set-new-password`,
        {
          email,
          password,
          passwordAgain,
        },
        config
      )
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          setPasswordSec(false);
          setFinalMessage(true);
          setLoading(false);
          setError("");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.error);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="flex items-center gap-3  p-2 rounded-lg my-2 ">
        <AiOutlineLock className="text-xl" />
        <input
          type="password"
          name="password"
          placeholder="Enter your new password"
          className="appearance-none block w-full bg-white text-black border-b border-gray-300 py-2 pl-3 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="my=2 text-red-600">{error}</p>}
      <div className="flex items-center gap-3 p-2 bg-white my-2 ">
        <AiOutlineLock className="text-xl" />
        <input
          type="password"
          name="passwordAgain"
          placeholder="Enter your new password Again"
          className="appearance-none block w-full bg-white text-black border-b border-gray-300 py-2 pl-3 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          className="bg-violet-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-400 w-full"
          disabled={loading}
          onClick={handlePasswordSubmit}
        >
          {loading ? "Loading" : "Reset"}
        </button>
      </div>
    </div>
  );
};
export default PasswordEnterSection;
