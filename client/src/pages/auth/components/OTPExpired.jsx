import React from 'react'
import {BsExclamationCircle} from 'react-icons/bs'
import {Link} from 'react-router-dom'
const OTPExpired = () => {
    return (
        <div className="w-full flex flex-col items-center ">
          <div className="text-9xl text-yellow-500 animate-bounce">
            <BsExclamationCircle />
          </div>
    
          <h1 className="my-5 text-yellow-500 text-center animate-bounce">
            Something went wrong!
          </h1>
          <Link to="/" className="btn-yellow text-white ">
            Go Home
          </Link>
        </div>
      );
}

export default OTPExpired