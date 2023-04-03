import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import Error from '../utilities/Error';

const countryRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/country',
    component: () => {
        return <div className="text-dgsoftwhite">Country Page</div>;
    },
    errorComponent: () => <Error />,
});

export default countryRoute;
