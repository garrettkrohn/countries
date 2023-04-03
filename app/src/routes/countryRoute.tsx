import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import Error from '../utilities/Error';
import Country from "../components/country/Country";

const countryRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/country',
    component: () => {
        return <Country />;
    },
    errorComponent: () => <Error />,
});

export default countryRoute;
