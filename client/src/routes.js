import React from 'react';
import {routes} from './consts'
import LoginPage from './pages/login/LoginPage';

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