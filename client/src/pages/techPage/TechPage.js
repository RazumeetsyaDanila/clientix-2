import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TechPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CopiedText from './../../components/UI/copiedText/CopiedText';
import { anydesk_get, rdp_get } from '../../http/clientsAPI';
import { useClipboard } from 'use-clipboard-copy';
import clearImg from '../../img/clear-img.png';
import Modal from '../../components/UI/modal/Modal';


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

    const nameField = React.useRef(document.createElement("input"))

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
        if (accessType === "ANYDESK") {
            // const data = await anydesk_get(orgId)
            // setAnydeskData(data)
        }
        if (accessType === "RDP") {
            const data = await rdp_get(orgId)
            setRdpData(data)
        }
        setRemoteAccessModal(true)
        setRemoteAccessType(accessType)

        // console.log(anydeskData[0].anydesk_id)
    }

    const clearSearch = () => {
        nameField.current.focus()
        setTextFilter('')
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
                        <input placeholder='Поиск организации...' ref={nameField} className={s.orgSearchInput} type="text" value={textFilter} onChange={e => setTextFilter(e.target.value)} />

                        <img src={clearImg} alt="" className={s.clearSearchBtn} onClick={clearSearch} />

                        <NavLink to='/org_add' className={s.orgAddBtn}>Добавить организацию</NavLink>
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
                                    <td data-th="Пароль админа" className={s.tdAdminPass}>{<CopiedText text={c.ORG_SIMED_ADMIN_PASS} />}</td>
                                    <td data-th="Доступ к серверу" className={s.tdAccessType}>
                                        {
                                            c.ORG_REMOTE_ACCESS_TYPE === 'NONE' ?
                                                <div>

                                                </div>
                                                :
                                                <div className={s.rdpCell} onClick={() => showRemoteAccess(c.ORG_ID, c.ORG_REMOTE_ACCESS_TYPE)}>
                                                    {c.ORG_REMOTE_ACCESS_TYPE}
                                                </div>
                                        }

                                    </td>
                                    <td data-th="Город" className={s.tdCity}>{c.ORG_CITY}</td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                {/* ================================================================================================== */}

                <Modal visible={remoteAccessModal} setVisible={setRemoteAccessModal}>
                    <div className='flex flex-col items-center w-[380px]'>
                        <p className={s.remoteAccessTitle}>Подключение по {remoteAccessType}</p>
                        <div>
                            {
                                (() => {
                                    switch (remoteAccessType) {
                                        case 'RDP':
                                            if (rdpData[0].id_org != 0) {
                                                return <div>
                                                    <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>IP</span> <div className={s.rdpIpTextBox}><CopiedText text={rdpData[0].RDP_IP} /></div></div>
                                                    <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>Логин</span> <div className={s.rdpIpTextBox}> <CopiedText text={rdpData[0].RDP_LOGIN} /> </div></div>
                                                    <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>Пароль</span> <div className={s.rdpIpTextBox}><CopiedText text={rdpData[0].RDP_PASSWORD} /></div></div>
                                                    <div className={s.rdpIpBox}><div className={s.rdpCommentBox}>{rdpData[0].RDP_COMMENT}</div></div>
                                                </div>
                                            }
                                            else return <div>Нет данных rdp</div>

                                        case 'ANYDESK':
                                            if (anydeskData[0].id_org != 0) {
                                                return <div className='flex flex-col items-center justify-center text-[20px]'>
                                                    <div className='flex'><span className='mr-[10px]'>ID:</span> <CopiedText text={anydeskData[0].anydesk_id} /></div>
                                                    <div className='flex' ><span className='mr-[10px]'>пароль:</span><CopiedText text={anydeskData[0].anydesk_password} /> </div>
                                                </div>
                                            }
                                            else return <div>Нет данных anydesk</div>

                                        default:
                                            return <div></div>
                                    }
                                })()
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TechPage;