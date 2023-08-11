import React from 'react'
import facebook from '../assets/facebook.png'
import google from '../assets/google.jpg'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import '../index.css'
import { useState } from 'react';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [isEmailFilled, setIsEmailFilled] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailFilled(newEmail !== ''); // Check if the email is not empty
  };
  return (
    <>
    {/* upper logo part */}
    <div className="border-b-[1px] border-[#525252] text-white h-[60px] flex items-center">
        <div className="w-[32px] flex flex-row ml-4"><img src={logo} alt="logo" /><div className='ml-2 text-3xl'>Synkro</div></div>
    </div>

<div className='flex flex-row'>
    <div className="text-white border-r-[1px] border-[#525252] h-[100vh] w-1/4 relative flex justify-center">
        <div className='absolute top-[60px] flex flex-col'>
            <p className='text-[44px]'>Synkro your chats<br/> with us.</p>
            <p className='font-semibold pt-[20px] pb-[20px] text-[15px] text-[#9b9b9b]'>"Embrace the World of Infinite Connections:<br/> Chat, Share Pictures, Share Videos - Unleashing<br/> Moments Across the Globe, Anytime, Anywhere!"</p>
            <div className='hover:cursor-pointer border border-[#525252] w-[340px] rounded-lg h-[50px] flex flex-row justify-between items-center mb-6'>
            <div className='ml-3'><img width={24} height={24} src={google}></img></div>
            <div className='mr-[27px]'><p>Sign in with Google</p></div>
            <div></div>
            </div>
            <div className='hover:cursor-pointer border border-[#525252] w-[340px] rounded-lg h-[50px] flex flex-row justify-between items-center mb-6'>
            <div className='ml-3'><img width={24} height={24} src={facebook}></img></div>
            <div className='mr-3'><p>Sign in with Facebook</p></div>
            <div></div>
            </div>
            <div className='flex flex-row'>
            <hr class="h-px w-[144px] my-3 mr-4 bg-[#525252] border-0"></hr>Or<hr class="h-px w-[144.5px] my-3 ml-4 bg-[#525252] border-0"></hr>
            </div>
            <div>
              <form className='mt-3'>
                <label>Email<span className='text-[#a2fe65]'>*</span></label><br/>
                <input
                name='email'
                type='email'
                autoComplete='email'
                className='bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder'
                placeholder="test@gmail.com"
                value={email}
                onChange={handleEmailChange}>
                </input>
                <div className='pt-2'><button
              className={`font-bold border border-[#525252] w-[340px] h-[50px] rounded-lg ${isEmailFilled ? 'bg-[#a2fe65] text-[#0a0a0a] hover:cursor-pointer' : 'bg-[#141414] text-[#525252] cursor-not-allowed'}`} disabled={!isEmailFilled}>Get Started</button></div>
              </form>
              <br/>
              <p className='text-[#525252] font-semibold'>Already have an account? <Link to="/login"><span className='text-[#a2fe65] font-semibold hover:cursor-pointer'>Login</span></Link></p>
            </div>
        </div>
    </div>

    {/* right div */}
    <div className='text-white text-4xl'>
        Welcome to Synkro! Start your journey by entering your email address.
    </div>
    </div>
    </>
  )
}

export default Signup