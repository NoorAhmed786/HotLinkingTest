import React from 'react' 
import './App.css'
import User from './getUser/User.jsx'
import Update from './updateUser/update.jsx';
import Adduser from './addUser/Adduser.jsx';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

function App() {
  const route= createBrowserRouter([
    {
      path:"/",
      element:<User/>
    },
    {
      path:"/adduser",
      element:<Adduser/>
    },
    {
      path:"/update/:id",
      element:<Update/>
    },
    {
      path:"/login"
    }
  ]);
 

  return (
    <>
    
     <RouterProvider router={route}></RouterProvider>
             
    </>

  )
}

export default App
