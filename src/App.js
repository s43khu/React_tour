import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login_page';
import Register from './component/Register_page';
import Home from './component/Home';
import Addpackage from './component/Addpackage';
import Admin from './component/Admin';
import Customer from './component/Customer';
import Viewcart from './component/Viewpack';
import Navbar from './Navbar';
import Aboutus from './component/Aboutus';
import Footer from './component/Footer';
import Contact from './component/Contactus';
import Booking from './component/Booking';
import { PackContext } from './contexts/PackContext'
import { ViewContext } from './contexts/Viewthis'
import Enquiry from './component/Enquiry';

export default function ZerO() {
  const [plist, setPlist] = useState([]);
  const [view, setView] = useState();
  return (
    <>
      <PackContext.Provider value={{ plist, setPlist }}>
        <ViewContext.Provider value={{ view, setView }}>
          <Navbar />

          <Routes>
          <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/addpackage" element={<Addpackage />} />
            <Route path="/viewcart" element={<Viewcart />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/enquiry" element={<Enquiry />} />
          </Routes>

          <Footer />
        </ViewContext.Provider>
      </PackContext.Provider>

    </>
  );
}