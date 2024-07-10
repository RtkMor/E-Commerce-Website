import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RiImageEditFill } from "react-icons/ri";
import Compressor from 'compressorjs';
import ApiSummary from '../common/ApiSummary.jsx';
import { fetchUserProfile, updateUserDetails } from '../store/userSlice.jsx';
import imageTobase62 from '../helpers/imageTobase62.jsx';
import loginIcon from '../assets/sign_in.gif';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const [formData, setFormData] = useState({
    _id: user?._id || '',
    name: user?.name || '',
    email: user?.email || '',
    mobileNumber: user?.mobileNumber || '',
    profilePic: user?.profilePic || '',
  });

  const [sentEmail, setSentEmail] = useState("");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: ""
  })

  const [profileError, setProfileError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    } else {
      setFormData({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profilePic: user.profilePic,
      });
      setSentEmail(user.email)
    }
  }, [dispatch, user]);

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Profile Updation
  const handleProfilePic = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success: async (compressedFile) => {
          const imagePic = await imageTobase62(compressedFile);
          setFormData(prev => ({ ...prev, profilePic: imagePic }));
          console.log("Profile Pic URL -> ", imagePic);
        },
        error: (err) => {
          console.error('Compression error:', err);
        }
      });
    }
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ApiSummary.updateUser.url, {
        method: ApiSummary.updateUser.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: formData._id,
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          profilePic: formData.profilePic
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }
      setProfileError(null);
      toast.success("Profile updated successfully!");
      dispatch(updateUserDetails(formData));
    } catch (error) {
      setProfileError(error.message);
    }
  }

  // Email Updation
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  
  const handleGetOtp = async () => {
    try {
      const response = await fetch(ApiSummary.sendOtp.url, {
        method: ApiSummary.sendOtp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }
      setEmailError(null);
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      setEmailError(error.message);
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(ApiSummary.verifyOtp.url, {
        method: ApiSummary.verifyOtp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }
      setEmailError(null);
      setOtpSent(false);
      await handleEmailSubmit();
    } catch (error) {
      setEmailError(error.message);
    }
  };
  
  const handleEmailSubmit = async () => {
    try {
      const response = await fetch(ApiSummary.updateUser.url, {
        method: ApiSummary.updateUser.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: formData._id,
          email: formData.email
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }
      setEmailError(null);
      toast.success("Email updated successfully!");
      // setSentEmail()
      dispatch(updateUserDetails(formData));
    } catch (error) {
      setEmailError(error.message);
    }
  }; 
  
  const handlePasswordSubmit = async() => {
    try {
      
      const response = await fetch(ApiSummary.forgotPassword.url, {
        method: ApiSummary.forgotPassword.method,
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          email: sentEmail,
          ...passwordData
        })
      })

      const responseData = await response.json();

      if(responseData.success){
        setPasswordError(null)
        setPasswordData({
          oldPassword: "",
          password: "",
          confirmPassword: ""
        })
        toast.success("Password updated successfully!")
      }
      else{
        throw new Error(responseData.message)
      }

    } catch (error) {
      setPasswordError(error.message)
    }
  }

  return (
    <section id='profile'>
      <div className='mx-auto container p-4'>
        <div className='p-4 w-full max-w-2xl mx-auto rounded flex flex-col gap-4'>
          
          {/* Column for Name and Profile Picture */}
          <div className='bg-white flex-col p-4 rounded-xl'>
            <h2 className='text-center font-bold'>Update Profile</h2>
            <div className='w-20 h-20 mx-auto mt-5'>
              <div className='w-20 h-20 absolute rounded-full border-red-600 border-[3.5px]'>
                <div className='w-full h-full overflow-hidden rounded-full absolute'>
                  <img src={formData.profilePic || loginIcon} alt="Profile image" className={`w-full h-full object-cover ${formData.profilePic ? "scale-[1]" : "scale-[1.12]"}`} />
                  {formData.profilePic === "" && <label>
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
                {formData.profilePic && (
                  <>
                    <input 
                      type='file'
                      className='hidden'
                      onChange={handleProfilePic}
                      ref={fileInputRef}/>
                    <RiImageEditFill 
                      onClick={() => document.querySelector('input[type="file"]').click()}
                      className='absolute -bottom-2 -right-2 text-3xl bg-red-500 hover:bg-red-700 cursor-pointer p-1 rounded-full'/>
                  </>
                )}
              </div>
            </div>

            {/* Display Error Message */}
            {profileError && (
              <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 rounded" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{profileError}</span>
              </div>
            )}

            <form className='mt-6 flex flex-col p-2 gap-2' onSubmit={handleProfileSubmit}>
              <div className='grid'>
                <label htmlFor="name">Name: </label>
                <div className='bg-slate-100 p-2 rounded-full'>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                    placeholder='Enter your name!'
                    className='w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobileNumber" className='text-center'>Mobile Number: </label>
                <div className='bg-slate-100 p-2 rounded-full'>
                  <input 
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleOnChange}
                    placeholder='Enter mobile number!'
                    className='w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>

              <button className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'>
                Update
              </button>
            </form>
          </div>

          {/* Column for Email */}
          <div className='bg-white flex-1 p-4 rounded-xl'>
            <h2 className='text-center font-bold'>Update Email</h2>

            {emailError && (
              <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 rounded" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{emailError}</span>
              </div>
            )}

            <form className='mt-6 flex flex-col gap-2'>
              <div>
                <label htmlFor="email" className='text-center'>Email: </label>
                <div className='bg-slate-100 p-2 rounded-full'>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder='Enter email!' 
                    required
                    className='w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label htmlFor="otp" className='text-center'>OTP: </label>
                  <div className='bg-slate-100 p-2 rounded-full'>
                    <input 
                      type="text" 
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder='Enter OTP' 
                      required
                      className='w-full h-full outline-none bg-transparent'
                    />
                  </div>
                  <div className='flex'>
                    <button 
                      type="button"
                      className='text-white hover:scale-110 transition-all bg-blue-600 hover:bg-blue-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                      onClick={setOtpSent(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      className='text-white hover:scale-110 transition-all bg-blue-600 hover:bg-blue-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}

              {!otpSent && (
                <button 
                  type="button"
                  className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                  onClick={handleGetOtp}
                >
                  Get OTP
                </button>
              )}
            </form>

          </div>

          {/* Column for Change Password */}
          <div className='bg-white flex-1 p-4 rounded-xl'>
            <h2 className='text-center font-bold'>Change Password</h2>

            {passwordError && (
              <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 rounded" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{passwordError}</span>
              </div>
            )}

            <form className='pt-6 flex flex-col gap-2'>
              <div>
                <label htmlFor="oldPassword" className='text-center'>Old Password: </label>
                <div className='bg-slate-100 p-2 rounded-full'>
                  <input 
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder='Enter old password'
                    required
                    className='w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className='text-center'>New Password: </label>
                <div className='bg-slate-100 p-2 rounded-full'>
                  <input 
                    type="password"
                    name="password"
                    value={passwordData.password}
                    onChange={handlePasswordChange}
                    placeholder='Enter new password'
                    required
                    className='w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className='text-center'>Confirm Password: </label>
                <div className='bg-slate-100 p-2 rounded-full'>
                  <input 
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder='Confirm new password'
                    required
                    className='w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>
              <button 
              type='button'
              onClick={handlePasswordSubmit}
              className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'>
                Change Password
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;