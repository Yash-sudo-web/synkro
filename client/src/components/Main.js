import React from 'react'

const main = () => {
    const handleLogout = () => {
        const token = document.cookie.split('=')[1];
        document.cookie = `token=${token}; max-age=-60`;
        window.location.href = '/';
    }
  return (
    <>
    <div>
        <button onClick={handleLogout} className='w-[100px] h-[100px] bg-white'>Logout</button>
    </div>
    </>
  )
}

export default main