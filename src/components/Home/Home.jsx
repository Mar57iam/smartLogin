import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [userName, setUserName] = useState('');
  let navigate  = useNavigate()
  
function logout (){
  localStorage.removeItem('userToken')
  navigate('/')
}



  useEffect(() => {
    
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
    <nav className=' w-full flex justify-between items-center p-3 text-white bg-[#1b2830]'> 
    <h1 className='uppercase text-xl ms-11 '>Smart Login</h1>
    <button onClick={()=>{
      logout()
    }}
     type="button" class="py-2.5 px-5  mb-2 text-sm font-medium me-8 text-slate-200 focus:outline-none  rounded-lg border border-orange-400 hover:bg-orange-400 shadow-xl shadow-[#1b2830]    ">Logout</button>
  </nav>
    <section >
<div className="text-center   h-[500px] justify-center flex items-center">
  <div className= ' w-full m-8 md:w-[50%] h-32 flex items-center justify-center border border-[#1b2830] shadow-2xl shadow-[#1b2830] '>
  <h1 className="text-3xl text-white ">Welcome, {userName}!</h1>

  </div>
    </div>
    </section>
    </>
  );
}