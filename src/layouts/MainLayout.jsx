import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom';
const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            
            <Outlet />
            
            <Footer />
        </>
    );
};

export default MainLayout;
