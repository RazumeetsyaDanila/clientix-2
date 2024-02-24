import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TagAddPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import backBtnImg from '../../img/previous.png'


const TagAddPage = () => {


    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
                <h2 className={s.appTitle}>CLIENTIX 2.0</h2>

                <NavLink to='/tags' className={s.backBtn}>
                    <img src={backBtnImg} alt="" />
                </NavLink>

            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    <h3 className={s.pageTitle}>Добавление тега</h3>
                    <div className={s.headerPanel}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagAddPage;