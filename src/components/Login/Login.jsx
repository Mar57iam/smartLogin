import React, { use } from 'react'
import style from './Login.module.css'
import { data, Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';



export default function Login() {

  const [ApiError ,setApiError] = useState('')
  const [Done ,setDone] = useState('')
  const [Loading ,setLoading] = useState(false)

let navigate = useNavigate()


function handleLogin(values){
  setLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
  .then((res)=>{
  setLoading(false)

  console.log(res);

    if( res.data.message =='success' ){
      // console.log('done');
      setDone(res.data.message)
      
  //go home
  localStorage.setItem('userName', res.data.user.name);
  localStorage.setItem('userToken', res.data.token)
  navigate('/home')
  }
  
  })
  .catch((res)=>{
    console.log(res.response.data.message);
  setLoading(false)



    setApiError(res.response.data.message)
    
  })
}

let validationSchema = yup.object().shape({
 
  email:yup.string()
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ , 'Email must be in a valid format (e.g., example@domain.org)or (test@gmail.com)  ')
  .email( 'Not Valid Email')
  .required('Email is Requierd'),
  password:yup.string()
  .min( 6, 'Min length is 6')
  .required('Password is Requierd'),
})



let formik = useFormik({
  initialValues:{
   
    email: '', 
    password:'',
   

  },
  validationSchema ,
  onSubmit:handleLogin

})


  return (
    <>
   
        <section className=' text-center sm:w-full h-lvh py-7   md:py-24  '>
        

<div className=" max-w-screen-sm   rounded-lg py-28  mx-auto p-2 bg-[#24353f]  border-[2px] border-[#24353f]  shadow-2xl shadow-[#212532]  md:p-8">

    <h1 className='main text-4xl my-5 '> Smart Login System </h1>


    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">




 <div className="relative z-0 w-full mb-5 group">
   <input
     type="email"
     name="email"
     value={formik.values.email}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     id="email"
     className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#17a2b8] peer"
     placeholder=" "
     required
   />
   <label
     htmlFor="email"
     className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#17a2b8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
    Enter Your email
   </label>

   {formik.errors.email && formik.touched.email?<>
      <div className="p-2 mb-8 text-base text-red-800 rounded-lg bg-red-200 " role="alert">
  <span className="font-medium"></span> {formik.errors.email}.
</div>
    
    </> : null }
 </div>

 <div className="relative z-0 w-full mb-8 group">
   <input
     type="password"
     name="password"
     value={formik.values.password}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     id="password"
     className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#17a2b8] peer"
     placeholder=" "
     required
   />
   <label
     htmlFor="password"
     className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#17a2b8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
     Password
   </label>

   {formik.errors.password && formik.touched.password?<>
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200" role="alert">
  <span className="font-medium"></span> {formik.errors.password}.
</div>
    
    </> : null }
 </div>

 


{ApiError? <div className='w-full rounded-md bg-red-200 text-red-700 mx-auto p-3'> <h2> {ApiError} </h2> </div> :null}
{Done? <div className='w-full rounded-md bg-green-200 text-green-700 mx-auto p-3'> <h2> {Done} </h2> </div> :null }
 
 <button
   type="submit"
   className="w-full text-white my-5 bg-[#17a2b8] hover:bg-transparent hover:border-[#17a2b8] hover:border focus:ring-4 focus:outline-none focus:ring-[#17a2b8] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
 >
   {Loading? <i className='fas fa-spinner fa-spin' ></i> : 'SignUp' }
 </button>


 <div className=' w-full flex justify-center text-white my-4 text-1xl '>
Don't have an account ? <Link  className='ms-2' to='/signup'> SignUp </Link> 
</div>
</form>
    </div>
    
</section>
    </>
  )
}