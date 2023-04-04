import { Route } from '@tanstack/react-router';
import Homepage from '../components/homepage/Homepage';
import React from 'react';
import rootRoute from './rootRoute';
import UserPage from "../components/user/UserPage";

const userRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/user',
    component: () => {
        return <UserPage />;
    },
});

export default userRoute;
