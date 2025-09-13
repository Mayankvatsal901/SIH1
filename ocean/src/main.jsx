import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './components/Home/Home';

import About from './components/About/About';
import SignUp from './components/Signup/Signup';
import Faq from './components/Faq/Faq';
import Map from './components/Map/Map';
import Chatbot from './components/Chatbot/Chatbot';
import Talk from './components/Talk/Talk';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/features"/>
      <Route path="/facts"/>
      <Route path="/chatbot" element={<Chatbot/>}/>
      <Route path="/faq" element={<Faq/>}/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/talkai" element={<Talk/>}/>
      

    
    </Route>  // Closing the root route here
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
