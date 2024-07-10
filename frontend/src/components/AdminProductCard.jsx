import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency.jsx';

const AdminProductCard = ({ data, onEditClick, onDeleteClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteClick(data);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className={`bg-red-400 p-4 relative z-10 flex flex-col rounded-xl shadow-lg transition-transform transform ${showConfirm ? 'scale-110' : 'hover:scale-105'} h-64 group`}>
      <div className="flex-shrink-0 h-40 w-full overflow-hidden rounded-t-lg">
        <img
          src={data?.productImage[0]}
          className='object-contain w-full h-full'
          alt={data.productName}
        />
      </div>
      <div className='flex flex-col justify-center mt-4'>
        <h2 className='text-lg truncate'>{data.productName}</h2>
        <p className='text-md text-gray-1000 font-semibold'>{displayINRCurrency(data.sellingPrice)}</p>
      </div>
      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
        <button 
          className='px-4 py-2 bg-green-600 text-white rounded-full mx-2 hover:bg-green-800'
          onClick={onEditClick}
        >
          Edit
        </button>
        <button 
          className='px-4 py-2 bg-red-600 text-white rounded-full mx-2 hover:bg-red-800'
          onClick={() => handleDeleteClick(data.id)}
        >
          Delete
        </button>
      </div>
      {showConfirm && (
        <div className='absolute inset-0 bg-white rounded-xl bg-opacity-90 flex flex-col items-center justify-center p-4'>
          <p>Are you sure you want to delete this product?</p>
          <div className='mt-4 flex space-x-4'>
            <button 
              className='px-4 py-2 bg-red-600 text-white rounded-full'
              onClick={handleConfirmDelete}
            >
              Confirm Delete
            </button>
            <button 
              className='px-4 py-2 bg-gray-300 text-black rounded-full'
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductCard;