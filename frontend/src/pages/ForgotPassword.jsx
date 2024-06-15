import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

import loginIcon from '../assets/sign_in.gif'

const ForgotPassword = () => {

  const [data, setData] = useState({
    email: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => {
        return {
            [name]: value
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  }


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

                    {/* Forgot Password Form */}
                    <form className='pt-6 flex flex-col p-2 gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label htmlFor="">Email: </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input 
                                    type="email" 
                                    name ="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    placeholder='Enter email here!' 
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        {/* OTP Button */}
                        <button className='text-white hover:scale-110 transition-all bg-red-600 hover:bg-red-800 rounded-full px-6 py-2 w-full max-w-[150px] mt-5 mx-auto block'>Send OTP</button>

                    </form>

                </div>
            </div>
        </section>
    )
}

export default ForgotPassword
