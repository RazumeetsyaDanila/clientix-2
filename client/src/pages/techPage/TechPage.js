import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TechPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CopiedText from './../../components/UI/copiedText/CopiedText';
import { anydesk_get, rdp_get } from '../../http/clientsAPI';
import { useClipboard } from 'use-clipboard-copy';


const TechPage = () => {

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const [currentClients, setCurrentClients] = useState(clients)
    const [textFilter, setTextFilter] = useState('')
    const [remoteAccessModal, setRemoteAccessModal] = useState(false)
    const [anydeskData, setAnydeskData] = useState([{}])
    const [rdpData, setRdpData] = useState([{}])
    const [remoteAccessType, setRemoteAccessType] = useState("")
    const { isAuth } = useTypedSelector(state => state.user)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { unsetUser, fetchClients, fetchTags } = useActions()
    const clipboard = useClipboard()

    const currentTime = new Date().getHours();

    const logOut = () => {
        unsetUser()
    }

    useEffect(() => {
        fetchClients()
        fetchTags()
    }, [])

    useLayoutEffect(() => {
        setCurrentClients(clients)
    }, [clients])

    const showRemoteAccess = async (orgId, accessType) => {
        if (accessType === "anydesk") {
            const data = await anydesk_get(orgId)
            setAnydeskData(data)

        }
        if (accessType === "rdp") {
            const data = await rdp_get(orgId)
            setRdpData(data)
        }
        setRemoteAccessModal(true)
        setRemoteAccessType(accessType)

        // console.log(anydeskData[0].anydesk_id)
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

                {/* ============================================ таблица с клиентами ===================================== */}
                <div className={s.tableContainer}>
                    <table className={s.table}>
                        <thead className={s.thead}>
                            <tr className={s.tr}>
                                <th className={s.thName}>Название организации</th>
                                <th className={s.thAdminPass}>Пароль админа</th>
                                <th className={s.thAccessType}>Доступ к серверу</th>
                                <th className={s.thCity}>Город</th>
                                {/* <th className={s.tableTd + ' w-[200px]'}>Комментарий</th> */}
                            </tr>
                        </thead>
                        <tbody className={s.tbody}>
                            {currentClients
                                .filter(c => c.ORG_NAME.toLowerCase().includes(textFilter.toLowerCase()))
                                .map(c => <tr key={c.ORG_ID}>
                                    <td data-th="Название организации" className={s.tdName}> <NavLink className={s.tdNameNavLink} to={'/org/' + c.ORG_ID}><div className={s.tdNameNavLinkDiv}>{c.ORG_NAME}</div></NavLink></td>
                                    <td data-th="Пароль админа" className={s.tdAdminPass}>{<CopiedText text={c.ORG_SIMED_PASS} />}</td>
                                    <td data-th="Доступ к серверу" className={s.tdAccessType}>
                                        {
                                            c.ORG_REMOTE_ACCESS_TYPE === 'нет' ?
                                                <div>
                                                    {c.ORG_REMOTE_ACCESS_TYPE}
                                                </div>
                                                :
                                                <div onClick={() => showRemoteAccess(c.ORG_ID, c.ORG_REMOTE_ACCESS_TYPE)}>
                                                    {c.ORG_REMOTE_ACCESS_TYPE}
                                                </div>
                                        }

                                    </td>
                                    <td data-th="Город" className={s.tdCity}>{c.ORG_CITY}</td>
                                    {/* <td className={s.tableTd + ' w-[200px]'} data-th="Комментарий">{c.comment}</td> */}
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                {/* ================================================================================================== */}
            </div>
        </div>
    );
};

export default TechPage;