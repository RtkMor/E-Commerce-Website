import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import loginIcon from '../assets/sign_in.gif';
import ApiSummary from '../common/ApiSummary.jsx';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(ApiSummary.signIn.url, {
                method: ApiSummary.signIn.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Network response was not ok');
            }

            setError(null);
            toast.success('Login successfully!');
            navigate('/');

            setData({
                email: "",
                password: ""
            });

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 w-full max-w-md mx-auto rounded'>

                    {/* Login GIF */}
                    <div className='mx-auto h-20 w-20 rounded-full overflow-hidden mt-5'>
                        <img src={loginIcon} alt="login icon" className='h-full w-full object-cover' />
                    </div>

                    {/* Display Error Message */}
                    {error && (
                        <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 rounded" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form className='pt-6 flex flex-col p-2 gap-2' onSubmit={handleSubmit}>

                        {/* Email Field */}
                        <div className='grid'>
                            <label htmlFor="email">Email: </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    placeholder='Enter email here!'
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password">Password: </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input
                                    type="password"
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    placeholder='Enter password here!'
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                            <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline text-red-600 hover:text-red-400 mt-1">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800  rounded-full px-6 py-2 w-full max-w-[150px] mt-5 mx-auto block'>Login</button>

                    </form>

                    {/* Don't have account */}
                    <span className="text-sm block w-fit mx-auto mt-1 mb-5">
                        Don't have account? <Link to={'/sign-up'} className="text-red-600 hover:underline hover:text-red-400">Sign-up!</Link>
                    </span>

                </div>
            </div>
        </section>
    );
};

export default Login;
