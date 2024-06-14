import React from 'react'
import loginIcon from '../assets/sign_in.gif'

const Login = () => {
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-2 w-full max-w-md mx-auto rounded'>

                {/* Login GIF */}
                <div className='mx-auto h-20 w-20 rounded-full overflow-hidden'>
                    <img src={loginIcon} alt="login icon" className='h-full w-full object-cover' />
                </div>

                {/* Login Form */}
                <form action="submit">
                    <div className='grid'>
                        <label htmlFor="">Email : </label>
                        <div className='bg-slate-100 p-2 '>
                            <input type="email" placeholder='enter email' className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Password : </label>
                        <div className='bg-slate-100 p-2 '>
                            <input type="password" placeholder='enter password' className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button>Login</button>

                </form>

            </div>
        </div>
    </section>
  )
}

export default Login
