import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import ApiSummary from '../common/ApiSummary.jsx';
import loginIcon from '../assets/sign_in.gif';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [emailError, setEmailError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleCheckUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiSummary.checkUser.url, {
        method: ApiSummary.checkUser.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        setEmailError(null);
        setSentEmail(data.email);
        handleGetOtp(data.email);
      } else {
        setEmailError(responseData.message);
        setLoading(false);
      }
    } catch (error) {
      setEmailError(error.message);
      setLoading(false);
    }
  };

  const handleGetOtp = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(ApiSummary.sendOtp.url, {
        method: ApiSummary.sendOtp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }

      setEmailError(null);
      setOtpSent(true);
    } catch (error) {
      setEmailError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiSummary.verifyOtp.url, {
        method: ApiSummary.verifyOtp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sentEmail, otp })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }

      setEmailError(null);
      setOtpSent(false);
      setShowPassword(true);
    } catch (error) {
      setEmailError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiSummary.forgotPassword.url, {
        method: ApiSummary.forgotPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sentEmail,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }

      setEmailError(null);
      setShowPassword(false);
      setOtpSent(false);
      setData({
        email: "",
        password: "",
        confirmPassword: ""
      });

      toast.success("Password updated successfully!");

    } catch (error) {
      setEmailError(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='relative bg-white p-2 w-full max-w-md mx-auto rounded'>

          {/* Back Arrow */}
          <Link className='absolute top-3 left-3 p-2 bg-red-600 rounded-full cursor-pointer hover:bg-red-800' to={'/login'}>
            <IoMdArrowRoundBack className='text-white text-2xl' />
          </Link>

          {/* Login GIF */}
          <div className='mx-auto h-20 w-20 rounded-full overflow-hidden mt-5'>
            <img src={loginIcon} alt="login icon" className='h-full w-full object-cover' />
          </div>

          {/* Error Display */}
          {emailError && (
            <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 rounded" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{emailError}</span>
            </div>
          )}

          {/* Email, OTP, Forgot Password Form */}
          <form className='pt-6 flex flex-col p-2 gap-2'>
            <div className='grid'>
              <label htmlFor="">Email: </label>
              <div className={`${showPassword || otpSent ? 'bg-white' : 'bg-slate-100'} p-2 rounded-full`}>
                <input
                  type="email"
                  name="email"
                  readOnly={showPassword || otpSent}
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder='Enter email here!'
                  className='w-full h-full outline-none bg-transparent' />
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
                    className='text-white hover:scale-110 transition-all bg-blue-500 hover:bg-blue-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                    onClick={() => setOtpSent(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </div>
            )}

            {!otpSent && !showPassword && (
              <button
                type="button"
                className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                onClick={handleCheckUser}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Get OTP'}
              </button>
            )}

            {showPassword && (
              <div>
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

                <button
                  type="button"
                  className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[200px] mt-5 mx-auto block'
                  onClick={handleUpdatePassword}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            )}

          </form>

        </div>
      </div>
      </section>
  );
};

export default ForgotPassword;

