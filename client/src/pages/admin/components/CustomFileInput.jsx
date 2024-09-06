import React, { useState, useRef } from "react";
import ImageUploadIcon from "./ImageUploadIcon";
import ImageCrop from "../../../components/ImageCropping"; // Import the ImageCrop component

const CustomFileInput = ({ onChange }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [croppingIndex, setCroppingIndex] = useState(-1); // Index of the image being cropped
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

    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles(files);
    onChange(files);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).slice(0, 5);
    const updatedFiles = [...droppedFiles, ...newFiles];
    setDroppedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleClearFiles = () => {
    setDroppedFiles([]);
    onChange([]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...droppedFiles];
    newFiles.splice(index, 1);
    setDroppedFiles(newFiles);
    onChange(newFiles);
  };

  const handleCropImage = (index) => {
    setCroppingIndex(index);
  };

  const handleSaveCroppedImage = (croppedImage) => {
    const updatedFiles = [...droppedFiles];
    updatedFiles[croppingIndex] = croppedImage;
    setDroppedFiles(updatedFiles);
    setCroppingIndex(-1);
  };

  return (
    <div
      className={`border-dashed border-2 border-violet-600 p-8 rounded-lg text-center h-full ${
        isDragging ? "bg-blue-100 border-blue-500" : "bg-white border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-center">
        <ImageUploadIcon />
      </div>
      <p className="text-sm text-gray-400 my-2">
        Drag and drop images here, or click add image
      </p>
      <button
        className="bg-violet-600 text-white text-sm font-semibold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Add Image
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
      {droppedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-5  justify-center flex-wrap">
            {droppedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded-lg shadow-lg mb-2 w-64 h-64 relative"
              >
                {file.type && file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-full w-full object-contain rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100"></div>
                )}
                <button
                  className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleCropImage(index)}
                >
                  Crop
                </button>
                <p className="flex-grow truncate text-xs mt-3">{file.name}</p>
                <button
                  className="absolute bg-red-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleDeleteFile(index)}
                >
                  X
                </button>
                {croppingIndex === index && (
                  <ImageCrop
                    image={file}
                    setImage={(croppedImage) =>
                      handleSaveCroppedImage(croppedImage)
                    }
                    offCrop={() => setCroppingIndex(-1)}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            className="mt-24 bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFiles}
          >
            Clear Files
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
