import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TechPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CopiedText from './../../components/UI/copiedText/CopiedText';
import { anydesk_get, rdp_get, vpn_get, other_access_get, org_add } from '../../http/clientsAPI';
import { useClipboard } from 'use-clipboard-copy';
import clearImg from '../../img/clear-img.png';
import appLogo from '../../img/tech-alien64.png';
import Modal from '../../components/UI/modal/Modal';


const TechPage = () => {

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const [currentClients, setCurrentClients] = useState(clients)
    const [textFilter, setTextFilter] = useState('')
    const [orgAddModal, setOrgAddModal] = useState(false)
    const [newOrgName, setNewOrgName] = useState('')
    const [newOrgCity, setNewOrgCity] = useState('')
    const [remoteAccessModal, setRemoteAccessModal] = useState(false)
    const [anydeskData, setAnydeskData] = useState([{}])
    const [rdpData, setRdpData] = useState([{}])
    const [vpnData, setVpnData] = useState([{}])
    const [otherAccessData, setOtherAccessData] = useState([{}])
    const [remoteAccessType, setRemoteAccessType] = useState("")
    const { isAuth } = useTypedSelector(state => state.user)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { unsetUser, fetchClients, fetchTags } = useActions()
    const clipboard = useClipboard()

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
            const data = await anydesk_get(orgId)
            setAnydeskData(data)
        }
        if (accessType === "RDP") {
            const data = await rdp_get(orgId)
            setRdpData(data)
        }
        if (accessType === "VPN и RDP") {
            const rdp = await rdp_get(orgId)
            setRdpData(rdp)
            const vpn = await vpn_get(orgId)
            setVpnData(vpn)
        }
        if (accessType === "Особенный") {
            const otherAccess = await other_access_get(orgId)
            setOtherAccessData(otherAccess)
        }
        setRemoteAccessModal(true)
        setRemoteAccessType(accessType)
    }

    const clearSearch = () => {
        nameField.current.focus()
        setTextFilter('')
    }

    const orgAdd = async () => {
        try {
            // if (tagName === '' || tagValue1 === '') {
            //     setErrorModal2(true)
            //     return
            // }
            if(newOrgName != ''){
                await org_add(newOrgName, newOrgCity)
                // setSuccessModal(true)
                
                setTimeout(() => fetchClients(), 100)
                setNewOrgName('')
                setNewOrgCity('')
                setOrgAddModal(false)
            }            
            // currentUserRole == 'admin' ? navigate(routes.ADMIN_ROUTE) : navigate(routes.SLAVE_ROUTE)
        } catch (e) {
            console.log(e.response.message)
        }
    }

    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
                <h2 className={s.appTitle}><img className={s.logoImg} src={appLogo}></img> CLIENTIX 2.0</h2>

                <div className={s.pageListContainer}>
                    <NavLink to='/tech' className={s.navLinkToTech}>Клиенты</NavLink>
                    <NavLink to='/tags' className={s.navLinkToTags}>Теги</NavLink>
                </div>

                <NavLink to='/login' className={s.exitBtn} onClick={logOut}>Выйти из учетной записи</NavLink>
            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    <h3 className={s.helloTitle}>Количество организаций: {clients.length}</h3>
                    <div className={s.headerPanel}>
                        <input placeholder='Поиск организации...' ref={nameField} className={s.orgSearchInput} type="text" value={textFilter} onChange={e => setTextFilter(e.target.value)} />

                        <img src={clearImg} alt="" className={s.clearSearchBtn} onClick={clearSearch} />

                        <div className={s.orgAddBtn} onClick={() => { setOrgAddModal(true) }}>Добавить организацию</div>
                    </div>
                </div>

                {/* ============================================ таблица с клиентами ===================================== */}
                <div className={s.tableContainer}>
                    <table className={s.table}>
                        <thead className={s.thead}>
                            <tr className={s.tr}>
                                <th className={s.thName}>Название организации</th>
                                <th className={s.thAdminPass}>Пароль администратора в Симеде</th>
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
                                            c.ORG_REMOTE_ACCESS_TYPE === 'Нет' ?
                                                <div className={s.rdpCell}>
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
                    <div>
                        <div>
                            {
                                (() => {
                                    switch (remoteAccessType) {
                                        case 'RDP':
                                            if (rdpData[0].ORG_ID != 0) {
                                                return <div>
                                                    <p className={s.remoteAccessTitle}>Данные {remoteAccessType}</p>

                                                    <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>IP</span> <div className={s.rdpIpTextBox}><CopiedText text={rdpData[0].RDP_IP} /></div></div>
                                                    <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>Логин</span> <div className={s.rdpIpTextBox}> <CopiedText text={rdpData[0].RDP_LOGIN} /> </div></div>
                                                    <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>Пароль</span> <div className={s.rdpIpTextBox}><CopiedText text={rdpData[0].RDP_PASSWORD} /></div></div>
                                                    <div className={s.rdpIpBox}><div className={s.rdpCommentBox}>{rdpData[0].RDP_COMMENT}</div></div>
                                                </div>
                                            }
                                            else return <div>Нет данных rdp</div>

                                        case 'ANYDESK':
                                            if (anydeskData[0].ORG_ID != 0) {
                                                return <div>
                                                    <p className={s.remoteAccessTitle}>Данные {remoteAccessType}</p>

                                                    <div className={s.anydeskDataBox}><span className={s.anydeskDataSpan}>Номер Anydesk</span> <div className={s.anydeskTextBox}> <CopiedText text={anydeskData[0].ANYDESK_NUMBER} /> </div></div>
                                                    <div className={s.anydeskDataBox}><span className={s.anydeskDataSpan}>Пароль Anydesk</span> <div className={s.anydeskTextBox}><CopiedText text={anydeskData[0].ANYDESK_PASSWORD} /></div></div>
                                                    {
                                                        anydeskData[0].ANYDESK_WINDOWS_LOGIN ?
                                                            <div className={s.anydeskDataBox}><span className={s.anydeskDataSpan}>Логин уч. записи windows</span> <div className={s.anydeskTextBox}><CopiedText text={anydeskData[0].ANYDESK_WINDOWS_LOGIN} /></div></div>
                                                            :
                                                            <div>
                                                            </div>
                                                    }

                                                    {
                                                        anydeskData[0].ANYDESK_WINDOWS_PASSWORD ?
                                                            <div className={s.anydeskDataBox}><span className={s.anydeskDataSpan}>Пароль уч. записи windows</span> <div className={s.anydeskTextBox}><CopiedText text={anydeskData[0].ANYDESK_WINDOWS_PASSWORD} /></div></div>
                                                            :
                                                            <div>
                                                            </div>
                                                    }
                                                    <div className={s.anydeskDataBox}><div className={s.rdpCommentBox}>{anydeskData[0].ANYDESK_COMMENT}</div></div>
                                                </div>
                                            }
                                            else return <div>Нет данных anydesk</div>

                                        case 'VPN и RDP':
                                            if (vpnData[0].ORG_ID != 0) {
                                                return <div>
                                                    <p className={s.remoteAccessTitle}>Данные {remoteAccessType}</p>

                                                    <div className={s.vpnRdpInfoContainer}>
                                                        <div className={s.vpnDataBox}><span className={s.vpnDataSpan}>VPN</span> <div className={s.vpnTextBox}>{vpnData[0].VPN_INFO}</div></div>
                                                        <div>
                                                            <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>IP RDP</span> <div className={s.rdpIpTextBox}><CopiedText text={rdpData[0].RDP_IP} /></div></div>
                                                            <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>Логин RDP</span> <div className={s.rdpIpTextBox}> <CopiedText text={rdpData[0].RDP_LOGIN} /> </div></div>
                                                            <div className={s.rdpIpBox}><span className={s.rdpIpSpan}>Пароль RDP</span> <div className={s.rdpIpTextBox}><CopiedText text={rdpData[0].RDP_PASSWORD} /></div></div>
                                                            {
                                                                rdpData[0].RDP_COMMENT ?
                                                                    <div className={s.rdpIpBox}><div className={s.rdpCommentBox}>{rdpData[0].RDP_COMMENT}</div></div>
                                                                    :
                                                                    <div>
                                                                    </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            else return <div>Нет данных VPN и RDP</div>
                                        case 'Особенный':
                                            // if (otherData[0].ORG_ID != 0) {
                                            return <div>
                                                <p className={s.remoteAccessTitle}>Данные подключения</p>
                                                <div className={s.otherDataBox}><div className={s.otherTextBox}>{otherAccessData[0].OTHER_ACCESS_INFO}</div></div>
                                            </div>
                                        // }
                                        // else return <div>Нет данных подключения</div>

                                        case 'Нет':
                                            return <div>
                                                Нет данных подключения
                                            </div>

                                        default:
                                            return <div></div>
                                    }
                                })()
                            }
                        </div>
                    </div>
                </Modal>


                <Modal visible={orgAddModal} setVisible={setOrgAddModal}>
                    <div className={s.addOrgContainer}>
                        <h2 className={s.addOrgTitle}> Добавление организации </h2>
                        <div className={s.addOrgInputContainer}>
                            <input className={s.addOrgInput} type="text" placeholder="Наименование организации" value={newOrgName} onChange={e => setNewOrgName(e.target.value)} />
                            <input className={s.addOrgInput} type="text" placeholder="Город" value={newOrgCity} onChange={e => setNewOrgCity(e.target.value)} />
                        </div>

                        <button className={s.addOrgBtn} onClick={orgAdd}>Добавить</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TechPage;