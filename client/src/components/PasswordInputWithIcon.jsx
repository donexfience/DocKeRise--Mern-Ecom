import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInputWithIcon = ({ name, placeholder, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Field
          className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <div className="signup-icon-show" onClick={togglePassword}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        </div>
      </div>
      <ErrorMessage className="text-sm text-red-500" name={name} component="span" />
    </div>
  );
};

export default PasswordInputWithIcon;
