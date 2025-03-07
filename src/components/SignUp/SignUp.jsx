import React, { use } from 'react'
import style from './Register.module.css'
import { data, Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';



export default function SignUp() {

  const [ApiError ,setApiError] = useState('') 
  const [Done ,setDone] = useState('')
  const [Loading ,setLoading] = useState(false)

let navigate = useNavigate()


function handleSignup(values){
  setLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
  .then((res)=>{
  setLoading(false)

  console.log(res);

    if( res.data.message =='success' ){
      // console.log('done');
      setDone(res.data.message)
      
  //go home
  localStorage.setItem('userName', values.name);
  localStorage.setItem('userToken', res.data.token)
  setTimeout(() => {
    navigate('/');
  }, 1000);

  }
  
  })
  .catch((res)=>{
    console.log(res.response.data.message);
  setLoading(false)



    setApiError(res.response.data.message)
    
  })
}

let validationSchema = yup.object().shape({
  name:yup.string().matches(/^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/, 'Each name should start with a capital letter and contain only letters')
  .required('Name is Requierd'),
  email:yup.string()
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ , 'Email must be in a valid format (e.g., example@domain.org)or (test@gmail.com)  ')
  .email( 'Not Valid Email')
  .required('Email is Requierd'),
  password:yup.string()
  .min( 6, 'Min length is 6')
  .required('Password is Requierd'),
  rePassword:yup.string()
  .oneOf([yup.ref('password')] , 'Password not matches')
  .min( 6, 'Min length is 6')
  .required('rePassword is Requierd'),
  phone:yup.string()
  .matches(/^01[1025][0-9]{8}$/ , 'phone not valid')
  .required('phone is Requierd'),

})



let formik = useFormik({
  initialValues:{
    name: '',
    email: '', 
    password:'',
    rePassword:'',
    phone:'',

  },
  validationSchema ,
  onSubmit:handleSignup

})


  return (
    <>
        <section className='  text-center sm:w-full h-lvh py-2    md:py-10  '>

<div className=" max-w-screen-sm py-6 rounded-md  mx-auto p-2 bg-[#24353f] border-[2px] border-[#24353f]  shadow-2xl shadow-[#212532] sm:py-20  md:p-8">

    <h1 className='main text-4xl my-5 '> Smart Login System </h1>


    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

    <div className="relative z-0 w-full mb-5 group">
   <input
     type="text"
     name="name"
     value={formik.values.name}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     id="name"
     className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#17a2b8] peer"
     placeholder=" "
     required
   />
   <label
     htmlFor="name"
     className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#17a2b8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
    Enter Your Name
   </label>

   {formik.errors.name && formik.touched.name?<>
      <div className="p-2 mb-8 text-base text-red-800 rounded-lg bg-red-200 " role="alert">
  <span className="font-medium"></span> {formik.errors.name}.
</div>
    
    </> : null }
 </div>



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

 <div className="relative z-0 w-full mb-8 group">
   <input
     type="password"
     name="rePassword"
     value={formik.values.rePassword}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     id="rePassword"
     className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#17a2b8] peer"
     placeholder=" "
     required
   />
   <label
     htmlFor="rePassword"
     className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#17a2b8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
     RePassword
   </label>
   {formik.errors.rePassword && formik.touched.rePassword?<>
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200" role="alert">
  <span className="font-medium"></span> {formik.errors.rePassword}.
</div>
    
    </> : null }
 </div>

 <div className="relative z-0 w-full mb-8 group">
   <input
     type="tel"
     name="phone"
     value={formik.values.phone}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     id="phone"
     className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#17a2b8] peer"
     placeholder=" "
     required
   />
   <label
     htmlFor="phone"
     className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#17a2b8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
     Enter Your Phone
   </label>
   {formik.errors.phone && formik.touched.phone?<>
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200" role="alert">
  <span className="font-medium"></span> {formik.errors.phone}.
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
You have an account ? <Link  className='ms-2' to="/"> Login </Link> 
</div>
</form>
    </div>
    
</section>
    </>
  )
}


