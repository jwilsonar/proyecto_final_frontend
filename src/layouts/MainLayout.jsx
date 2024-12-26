import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;
