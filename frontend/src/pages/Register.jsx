import React, { useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { RiImageEditFill } from "react-icons/ri";
import Compressor from 'compressorjs';

import loginIcon from '../assets/sign_in.gif';
import imageTobase62 from '../helpers/imageTobase62.jsx';
import ApiSummary from '../common/ApiSummary.jsx';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    profilePic: ""
  });

  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleProfilePic = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success: async (compressedFile) => {
          const imagePic = await imageTobase62(compressedFile);
          setData(prev => ({ ...prev, profilePic: imagePic }));
        },
        error: (err) => {
          console.error('Compression error:', err);
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ApiSummary.signUp.url, {
        method: ApiSummary.signUp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }

      setError(null);
      toast.success("Account created successfully!");
      navigate("/login")

      setData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        profilePic: ""
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id='register'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 w-full max-w-md mx-auto rounded'>
          
          {/* Profile Picture */}
          <div className='w-20 h-20 mx-auto mt-5'>
            <div className='w-20 h-20 absolute rounded-full border-red-600 border-[3.5px]'>
              <div className='w-full h-full overflow-hidden rounded-full absolute'>
                <img src={data.profilePic || loginIcon} alt="login icon" className={`w-full h-full object-cover ${data.profilePic ? "scale-[1]" : "scale-[1.12]"}`} />
                {data.profilePic == "" && <label>
                  <div className='w-full h-40 absolute top-10 bg-slate-200 hover:bg-slate-300 hover:cursor-pointer text-xs text-center rounded-bottom-full border-t-[3.5px] border-red-600'>
                    Upload Pic
                    <input 
                      type="file" 
                      className='hidden' 
                      onChange={handleProfilePic}
                      ref={fileInputRef}/>
                  </div>
                  </label>
                }
              </div>
              {data.profilePic && (
                <>
                <input 
                  type='file'
                  className='hidden'
                  onChange={handleProfilePic}
                  useRef={fileInputRef}/>
                <RiImageEditFill 
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className='absolute -bottom-2 -right-2 text-3xl bg-red-500 hover:bg-red-700 cursor-pointer p-1 rounded-full'/>
                </>
              )}
            </div>
          </div>

          {/* Display Error Message */}
          {error && (
            <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 rounded" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Register Form */}
          <form className='pt-6 flex flex-col p-2 gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label htmlFor="name">Name: </label>
              <div className='bg-slate-100 p-2 rounded-full'>
                <input 
                  type="text" 
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder='Enter your name!' 
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label htmlFor="email">Email: </label>
              <div className='bg-slate-100 p-2 rounded-full'>
                <input 
                  type="email" 
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder='Enter email!' 
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password: </label>
              <div className='bg-slate-100 p-2 rounded-full'>
                <input 
                  type="password" 
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder='Enter password!' 
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <div className='bg-slate-100 p-2 rounded-full'>
                <input 
                  type="password" 
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  placeholder='Confirm password!' 
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label htmlFor="mobileNumber">Mobile Number: </label>
              <div className='bg-slate-100 p-2 rounded-full'>
                <input 
                  type="text" 
                  name='mobileNumber'
                  value={data.mobileNumber}
                  onChange={handleOnChange}
                  placeholder='Enter mobile number!' 
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <button className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'>
              Create Account
            </button>
          </form>

          <span className="text-sm block w-fit mx-auto mt-1 mb-5">
            Already have an account? <Link to={'/login'} className="text-red-600 hover:underline hover:text-red-400">Login!</Link>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Register;
