import React from 'react';
import {routes} from './consts'
import LoginPage from './pages/login/LoginPage';
import TechPage from './pages/techPage/TechPage';
import TagsPage from './pages/tagsPage/TagsPage';
import TagAddPage from './pages/tagAdd/TagAddPage';
import OrgPage from './pages/orgPage/OrgPage';
import ReauthPage from './pages/reauth/ReauthPage';

export const publicRoutes = [
    {
        path: routes.LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: routes.REAUTH_ROUTE,
        Component: ReauthPage
    }
]

export const techRoutes = [
    {
        path: routes.TECH_ROUTE,
        Component: TechPage 
    },
    {
        path: routes.TAGS_ROUTE,
        Component: TagsPage 
    },
    {
        path: routes.TAG_ADD_ROUTE,
        Component: TagAddPage
    }
    ,
    {
        path: routes.ORG_ROUTE,
        Component: OrgPage
    }
]