import React, { useRef, useState } from "react";

const CustomSingleFileInput = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Changed initial state to false
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file, "image added in signup");
    onChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    onChange([]);
  };

  return (
    <div
      className={`h-45 w-45 border-dashed border-4 rounded-lg text-center ${
        isDragging
          ? "bg-violet border-violet-500"
          : "bg-gray-100 border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="bg-white p-2 h-full w-full rounded-lg shadow-lg">
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
              className="object-cover rounded-md w-20 h-20 mx-auto"
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-full"
              onClick={handleClearFile}
            >
              X
            </button>
          </div>
          <p className="truncate text-xs mt-3">{selectedFile.name}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-8">
          <div>
            <div className="flex justify-center">
              <img
                src={"/ImageUpload.jpg"}
                alt=""
                style={{ width: "80px", height: "80px" }}
              />
            </div>

            <p className="text-sm text-gray-400 my-2">
              Drag and drop an image here, or click to upload
            </p>
            <button
              type="button"
              className="bg-zinc-200 text-violet-500 text-sm font-semibold py-2 px-4 rounded"
              onClick={handleButtonClick}
            >
              Upload Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSingleFileInput;
