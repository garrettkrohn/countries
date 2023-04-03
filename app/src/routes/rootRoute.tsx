import { Outlet, RootRoute } from '@tanstack/react-router';
import React from 'react';
import Navbar from "../components/navbar/Navbar";
import Homepage from "../components/homepage/Homepage";

const rootRoute = new RootRoute({
    component: () => {
        return (
           <>
               <Navbar />
               <Outlet />
           </>
        );
    },
});

export default rootRoute;
