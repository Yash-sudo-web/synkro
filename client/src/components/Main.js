import React from 'react'

const main = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
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