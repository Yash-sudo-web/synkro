import React from 'react'

const User = () => {
    const handleLogout = () => {
        document.cookie = 'token=; max-age=-60';
        window.location.href = '/';
      }
  return (
    <>
     <div><button onClick={handleLogout} className='w-[100px] h-[100px] bg-white'>Logout</button></div></>
  )
}

export default User