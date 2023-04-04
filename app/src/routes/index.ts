import { Router } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import countryRoute from "./countryRoute";
import indexRoute from "./indexRoute";
import userRoute from "./userRoute";

const routeTree = rootRoute.addChildren([
    indexRoute,
    countryRoute,
    userRoute
]);

export const router = new Router({
    routeTree,
    defaultPreload: 'intent',
});
