import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import "./crop.css";

const CroppingModal = ({ image, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [base64Image, setBase64Image] = useState("");
  console.log(image, "");
  useEffect(() => {
    if (image[currentImageIndex]) {
      convertToBase64(image[currentImageIndex]);
    }
  }, [image, currentImageIndex]);

  const convertToBase64 = (file) => {
    console.log("Converting to base64:", file);
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Base64 conversion successful:", reader.result);
      setBase64Image(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error occurred while reading the file:", error);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      // Pass the cropped area data to the onSave function
      onSave(currentImageIndex, croppedArea, croppedAreaPixels);
    },
    [currentImageIndex, onSave]
  );
  console.log(base64Image, "-------------------------");
  return (
    <div className="cropping-modal-overlay">
      <div className="cropping-modal-container">
        <div className="cropping-modal-header">
          <h2>Crop Image</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="cropping-modal-body">
          <Cropper
            image={base64Image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="cropping-modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CroppingModal;
