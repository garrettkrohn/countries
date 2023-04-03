import { Router } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import countryRoute from "./countryRoute";
import indexRoute from "./indexRoute";

const routeTree = rootRoute.addChildren([
    indexRoute,
    countryRoute
]);

export const router = new Router({
    routeTree,
    defaultPreload: 'intent',
});
