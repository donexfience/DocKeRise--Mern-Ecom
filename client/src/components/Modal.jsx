import React from 'react'

const Modal = ({content}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 z-60">
      <div className="bg-white w-2/6 rounded-lg">
        {content}
      </div>
    </div>
  )
}

export default Modal