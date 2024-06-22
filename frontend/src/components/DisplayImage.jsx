import React, { useEffect, useRef } from 'react';
import { FaTimes } from "react-icons/fa";

const DisplayImage = ({ imageUrl, onClose }) => {
  const imageRef = useRef(null);

  // Close the full-screen image if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageRef.current && !imageRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75'>
      <div ref={imageRef} className='relative border-2 border-black'>
        <button className='absolute top-2 right-2 text-white bg-black border-4 border-white hover:bg-white hover:text-black hover:border-black bg-opacity-75 rounded-full p-2' onClick={onClose}>
          <FaTimes className='sm:text-xl text-xs' />
        </button>
        <img src={imageUrl} alt="Full Screen" className='max-w-full max-h-screen' />
      </div>
    </div>
  );
}

export default DisplayImage;
