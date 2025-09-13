import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import About from './components/About/About';
import SignUp from './components/Signup/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About/>}/>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>}/>
    </Route>  // Closing the root route here
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
