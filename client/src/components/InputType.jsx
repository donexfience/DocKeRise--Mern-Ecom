import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

const InputType = ({ title, name, placeholder, optional }) => {
  const { errors, touched } = useFormikContext();
  const hasError = errors[name] && touched[name];

  return (
    <div className="text-sm my-2 w-full ">
      <p className="my-1 px-3 font-semibold">
        <label htmlFor="username" className="text-violet-500">
          {title}{" "}
          <span className="text-gray-400">{optional && "(Optional)"}</span>
        </label>
      </p>
      <Field
        className={`border px-2 bg-white focus:border-blue-500 shadow-md ${
          hasError ? "border-red-400" : ""
        } px-5 py-2 rounded outline-none w-full`}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    </div>
  );
};

export default InputType;
