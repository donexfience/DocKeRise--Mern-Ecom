import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import Delivery from '../../../../assets/Delivery.mp4'

const  AnimatedCartButton = ({ onClick, isLoading }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  return (
    <button
      className={`relative flex items-center justify-center px-4 py-2 text-black border-2 border-purple-600 rounded-lg transition-all duration-300 w-full ${
        isClicked ? "animate-vibrate" : ""
      }`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin mr-2 font-bold" />
      ) : (
        <>
          {!isClicked && (
            <>
              <span className="font-bold">Add to Cart</span>
              <AiOutlineShoppingCart className="ml-2 font-bold" />
            </>
          )}
          {isClicked && (
            <div className="w-10 h-10">
              <video autoPlay loop muted className="object-cover">
                <source src={Delivery} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </>
      )}
    </button>
  );
};

export default AnimatedCartButton;
