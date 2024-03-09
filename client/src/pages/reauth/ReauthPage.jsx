import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const ReauthPage = () => {
    const { isAuth, role } = useTypedSelector(state => state.user)

    return (
        <div>
            <h1>Время авторизации закончилось, необходимо авторизоваться снова.</h1>
            <NavLink to='/login'>Вернуться на страницу авторизации</NavLink>
        </div>
    );
};

export default ReauthPage;