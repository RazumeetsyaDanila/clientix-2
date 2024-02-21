import React, {useEffect} from 'react';
import { Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { correct_routes, REACT_APP_URL, routes } from './consts';
import { useTypedSelector } from './hooks/useTypedSelector';
import { slaveRoutes, adminRoutes, publicRoutes } from './routes';

const AppRouter = () => {

    const { isAuth, role } = useTypedSelector(state => state.user)
    // костыль для проверки корректности текущего url, чтобы при некорректном перенаправлялось на страницу логина
    
    let checkPath = false
    let current_path = window.location.href.replace(REACT_APP_URL, '')
    if (correct_routes.indexOf(current_path) !== -1) checkPath = true

    

    useEffect(() => {
        if(!isAuth && current_path == 'admin') return <p>kek</p>
    }, [])

    return (
        <Routes>
            {/* {isAuth && role === 'admin' && adminRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            {isAuth && role === 'slave' && slaveRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )} */}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            {!checkPath && <Route path="*" element={<Navigate to={routes.LOGIN_ROUTE} />} />}
            {/* {!isAuth && <Route path='*' element={<Navigate to={routes.REAUTH_ROUTE} />} />} */}
        </Routes>
    );
};

export default AppRouter;