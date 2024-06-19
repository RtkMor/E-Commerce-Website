import React, { useState, useContext } from 'react';
import ROLE from '../common/ROLE.jsx';
import ApiSummary from '../common/ApiSummary.jsx';
import { toast } from 'react-toastify';
import Context from '../context';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ChangeUserRoles = ({ user, onClose, onSave }) => {
  const { fetchUserDetails } = useContext(Context);
  const [userRole, setUserRole] = useState(user.role);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user.user._id);

  const handleChangeUserRole = (e) => {
    setUserRole(e.target.value);
  };

  const toastOptions = {
    autoClose: 1000,
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(ApiSummary.updateUser.url, {
        method: ApiSummary.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: user._id,
          role: userRole
        })
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message, toastOptions);
        onSave({ ...user, role: userRole });
      } else {
        toast.error(responseData.message, toastOptions);
      }
    } catch (error) {
      toast.error("Failed to update user role!");
    }
  };

  const handleSave = () => {
    if (user._id === loggedUser && userRole === ROLE.GENERAL) {
      setShowConfirmation(true);
    } else {
      updateUserRole();
      fetchUserDetails();
    }
  };

  const confirmRoleChange = async () => {
    try {
      setShowConfirmation(false);
      await updateUserRole();
      fetchUserDetails();
      navigate("/");
    } catch (error) {
      toast.error("Failed to update user role!");
    }
  };

  const cancelRoleChange = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-10 w-full h-full flex items-center justify-center bg-red-100 bg-opacity-50' onClick={onClose}>
      <div className='w-full max-w-sm p-4 bg-white text-black border-red-600 border-2 rounded-lg shadow-lg' onClick={(e) => e.stopPropagation()}>
        <h1 className='text-lg font-semibold underline mb-4'>Change User Roles</h1>
        <p>Name - {user.name}</p>
        <p>Email - {user.email}</p>
        <div className='mt-4'>
          <label className='block text-sm font-medium mb-1'>Role</label>
          <select
            className='block w-full mt-1 p-2 bg-red-600 text-white border-2 rounded-md shadow-lg outline-none'
            value={userRole}
            onChange={handleChangeUserRole}
          >
            {Object.values(ROLE).map(item => (
              <option key={item} value={item} className='bg-white text-black'>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-5 flex justify-around text-white'>
          <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg' onClick={handleSave}>Save</button>
          <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg' onClick={onClose}>Cancel</button>
        </div>
      </div>
      {showConfirmation && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50' onClick={(e) => e.stopPropagation()}>
          <div className='bg-white p-4 rounded-lg text-center'>
            <p className='text-lg font-semibold mb-2'>Are you sure?</p>
            <p className='mb-4'>You are about to modify your own admin rights.</p>
            <div className='flex justify-center'>
              <button className='bg-red-600 hover:bg-red-800 text-white p-2 rounded-lg mx-2' onClick={confirmRoleChange}>
                Yes, proceed
              </button>
              <button className='bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-lg mx-2' onClick={cancelRoleChange}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeUserRoles;
