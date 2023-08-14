import React, { useEffect } from 'react'

const redirect = () => {
    var url_string = window.location;
    var url = new URL(url_string);
    var vid = url.searchParams.get("Id");
    console.log(vid)
    document.cookie = `token=${vid} ; max-age=${60*60*24*30}`;
    window.location.href = '/app';
  return (
    <div className='text-white'>redirect</div>

  )
}

export default redirect