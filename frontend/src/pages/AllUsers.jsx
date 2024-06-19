import React, { useEffect, useState } from 'react';
import ApiSummary from '../common/ApiSummary.jsx';
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRoles from '../components/ChangeUserRoles.jsx';

const options = { month: 'long', day: '2-digit', year: 'numeric' };

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [showChangeUserRoles, setShowChangeUserRoles] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fetchAllUsers = async () => {
    const request = await fetch(ApiSummary.allUsers.url, {
      method: ApiSummary.allUsers.method,
      credentials: "include"
    });

    const response = await request.json();

    if (response.success) {
      setAllUsers(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setHoveredRowIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredRowIndex(null);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowChangeUserRoles(true);
  };

  const handleClose = () => {
    setShowChangeUserRoles(false);
  };

  const handleSave = (updatedUser) => {
    setAllUsers((prevUsers) => 
      prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setShowChangeUserRoles(false);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full usersTable'>
        <thead>
          <tr>
            {isMobile ? (
              <th>Action</th>
            ) : (
              <th>Sr.</th>
            )}
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Role</th>
            <th>Account Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item, index) => (
            <tr
              key={item._id}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <td className="text-center">
                {(hoveredRowIndex === index || isMobile) ? (
                  <button
                    className="bg-green-300 rounded-full p-2 hover:bg-green-600 text-black hover:text-white"
                    style={{ width: '2rem', height: '2rem', lineHeight: '1.5rem' }}
                    onClick={() => handleEditClick(item)}
                  >
                    <MdModeEdit />
                  </button>
                ) : (
                  <span style={{ display: 'inline-block', width: '2rem', height: '2rem', lineHeight: '2rem' }}>
                    {index + 1}
                  </span>
                )}
              </td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.mobileNumber}</td>
              <td>{item?.role}</td>
              <td>{new Date(item?.createdAt).toLocaleDateString('en-US', options)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showChangeUserRoles && (
        <ChangeUserRoles user={selectedUser} onClose={handleClose} onSave={handleSave}/>
      )}
    </div>
  );
};

export default AllUsers;
