import React from 'react'
import facebook from '../assets/facebook.png'
import google from '../assets/google.jpg'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <>
    {/* upper logo part */}
    <div className="border-b-[1px] border-[#525252] text-white h-[60px] flex items-center">
        <div className="w-[32px] flex flex-row ml-4"><img src={logo} alt="logo" /><div className='ml-2 text-3xl'>Synkro</div></div>
    </div>


    <div className="text-white border-r-[1px] border-[#525252] h-[100vh] w-1/4 relative flex justify-center">
        <div className='absolute top-[60px] flex flex-col'>
            <p className='text-[44px]'>Synkro your chats<br/> with us.</p>
            <p className='font-bold pt-[20px] pb-[20px] text-[15px] text-[#525252]'>"Embrace the World of Infinite Connections:<br/> Chat, Share Pictures, Share Videos - Unleashing<br/> Moments Across the Globe, Anytime, Anywhere!"</p>
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
                <input className='bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white' placeholder="test@gmail.com" style={{ '::placeholder': { color: '#9b9b9b' } }}></input>
                <div className='pt-2'><button className='bg-[#141414] text-[#525252] font-bold border border-[#525252] w-[340px] h-[50px] rounded-lg hover:bg-[#a2fe65] hover:text-[#0a0a0a]'>Get Started</button></div>
              </form>
              <br/>
              <p className='text-[#525252] font-semibold'>Already have an account? <span className='text-[#a2fe65] font-semibold hover:cursor-pointer'>Login</span></p>
            </div>
        </div>
    </div>

    {/* right div */}
    <div></div>
    </>
  )
}

export default Signup