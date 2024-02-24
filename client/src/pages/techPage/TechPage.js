import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TechPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const TechPage = () => {

    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { unsetUser, fetchClients, fetchTags } = useActions()

    const currentTime = new Date().getHours();

    const logOut = () => {
        unsetUser()
    }

    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
                <h2 className={s.appTitle}>CLIENTIX 2.0</h2>

                <div className={s.pageListContainer}>
                    <NavLink to='/tech' className={s.navLinkToTech}>Клиенты</NavLink>
                    <NavLink to='/tags' className={s.navLinkToTags}>Теги</NavLink>
                </div>

                <NavLink to='/login' className={s.exitBtn} onClick={logOut}>Выйти из учетной записи</NavLink>
            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    {/* <h3 className={s.helloTitle}>Добро пожаловать, {currentUserLogin}!</h3> */}
                    {
                        (() => {
                            switch (true) {
                                case currentTime <= 4:
                                    return <h3 className={s.pageTitle}>Доброй ночи, {currentUserLogin}!</h3>
                                case currentTime <= 12:
                                    return <h3 className={s.pageTitle}>Доброе утро, {currentUserLogin}!</h3>
                                case currentTime <= 17:
                                    return <h3 className={s.pageTitle}>Добрый день, {currentUserLogin}!</h3>
                                case currentTime <= 23:
                                    return <h3 className={s.pageTitle}>Добрый вечер, {currentUserLogin}!</h3>
                                default:
                                    return <div></div>
                            }
                        })()
                    }
                    {/* <h3 className={s.pageTitle}>Клиенты</h3> */}
                    <div className={s.headerPanel}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechPage;