import React from 'react';
import {routes} from './consts'
import LoginPage from './pages/login/LoginPage';
import TechPage from './pages/techPage/TechPage';

export const publicRoutes = [
    {
        path: routes.LOGIN_ROUTE,
        Component: LoginPage
    },
    // {
    //     path: routes.REAUTH_ROUTE,
    //     Component: Reauth
    // }
]

export const techRoutes = [
    {
        path: routes.TECH_ROUTE,
        Component: TechPage 
    }
]