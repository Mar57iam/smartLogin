import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Notfound from './components/Notfound/Notfound'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'



function App() {
  let x = createBrowserRouter(
    [
      { path: '/', element: <Login /> }, 
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'signup', element: <SignUp /> },
      { path: '*', element: <Notfound /> },
    ],
    { basename: "/smartLogin" } 
  );
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={x}></RouterProvider>
    </>
  )
}

export default App




