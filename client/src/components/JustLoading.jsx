import React from "react";

const JustLoading = ({ size }) => {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="w-5 h-5 bg-black rounded-full opacity-60 absolute top-0 left-0"></div>
      <div className="w-5 h-5 bg-black rounded-full opacity-60 absolute top-0 right-0"></div>
    </div>
  );
};

export default JustLoading;
