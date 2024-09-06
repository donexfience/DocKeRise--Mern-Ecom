import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import ErrorPic from "../../assets/Error.jpg";

const Error = () => {
  return (
    <div className="w-full   items-center justify-center p-5">
      <div className="flex justify-center items-center">
        <img
          src={ErrorPic}
          style={{ maxWidth: "600px", maxHeight: "600px" }}
          alt="Error"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-lg font-bold">
            Oops! Something went wrong
          </h1>
          <p className="text-center">
            The page you are looking for could not be found.
          </p>
          <Link to="/" className="text-blue-500 hover:underline ">
            <p className="text-center font-bold pt-2"> Go back to Home</p>
           
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
