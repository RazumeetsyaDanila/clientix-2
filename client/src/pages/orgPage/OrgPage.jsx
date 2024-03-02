import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../../components/UI/modal/Modal';
import { org_delete, org_get } from '../../http/clientsAPI';
import { anydesk_get, rdp_get, vpn_get, other_access_get, org_add } from '../../http/clientsAPI';
import { routes } from '../../consts';
import s from './OrgPage.module.scss';
import appLogo from '../../img/tech-alien64.png';
import backBtnImg from '../../img/previous.png';
import CopiedText from '../../components/UI/copiedText/CopiedText';


const OrgPage = () => {
    const params = useParams();
    const orgId = params.id;
    let orgIdNum = +orgId; //string to number

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    let currentOrg = clients.find(clients => clients.ORG_ID == orgId)
    // const [currentOrg, setCurrentOrg] = useState([{}])


    const [currentOrgRemoteAccess, setCurrentOrgRemoteAccess] = useState([{}])

    const [view, setView] = useState("main")

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const [mainEditModal, setMainEditModal] = useState(false)
    const [databaseEditModal, setDatabaseEditModal] = useState(false)
    const [queueEditModal, setQueueEditModal] = useState(false)
    const [egiszEditModal, setEgiszEditModal] = useState(false)
    const [contactsEditModal, setContactsEditModal] = useState(false)

    const [editOrgComment, setEditOrgComment] = useState('')
    const [editOrgRemoteAccess, setEditOrgRemoteAccess] = useState('')
    const [editOrgCity, setEditOrgCity] = useState('')
    const [editOrgSimedAdminPass, setEditOrgSimedAdminPass] = useState('')
    const [editOrgAnydeskId, setEditOrgAnydeskId] = useState('')
    const [editOrgAnydeskPassword, setEditOrgAnydeskPassword] = useState('')

    const [editOrgRdpVpnIp, setEditOrgRdpVpnIp] = useState('')
    const [editOrgRdpVpnLogin, setEditOrgRdpVpnLogin] = useState('')
    const [editOrgRdpVpnPassword, setEditOrgRdpVpnPassword] = useState('')
    const [editOrgRdpVpnType, setEditOrgRdpVpnType] = useState('')
    const [editOrgRdpIp, setEditOrgRdpIp] = useState('')
    const [editOrgRdpLogin, setEditOrgRdpLogin] = useState('')
    const [editOrgRdpPassword, setEditOrgRdpPassword] = useState('')
    const [editOrgRdpWindowsLogin, setEditOrgRdpWindowsLogin] = useState('')
    const [editOrgRdpWindowsPassword, setEditOrgRdpWindowsPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        // setCurrentOrg(clients.find(clients => clients.ORG_ID == orgId))
        // console.log(currentOrg)
        getRemoteAccess(orgIdNum, currentOrg.ORG_REMOTE_ACCESS_TYPE)
    }, [])

    const getRemoteAccess = async (orgIdNum, accessType) => {
        if (accessType === "ANYDESK") {
            const accessData = await anydesk_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
        }
        if (accessType === "RDP") {
            const accessData = await rdp_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
        }
        if (accessType === "VPN и RDP") {

        }
        if (accessType === "Описание подключения") {
            const accessData = await other_access_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
        }
    }

    // const startDeleteOrg = () => {
    //     setDeleteConfirmModal(true)
    // }

    // const startEditOrg = () => {
    //     if (view === 'main') {
    //         setMainEditModal(true)
    //         setEditOrgComment(currentOrg.comment)
    //         setEditOrgRemoteAccess(currentOrg.remote_access)
    //         setEditOrgCity(currentOrg.city)
    //         setEditOrgSimedAdminPass(currentOrg.simed_admin_pass)
    //         if(currentOrg.remote_access === 'anydesk'){
    //             setEditOrgAnydeskId(currentOrgRemoteAccess[0].anydesk_id)
    //             setEditOrgAnydeskPassword(currentOrgRemoteAccess[0].anydesk_password)
    //         }
    //         if(currentOrg.remote_access === 'rdp'){
    //             setEditOrgRdpVpnIp(currentOrgRemoteAccess[0].vpn_ip)
    //             setEditOrgRdpVpnLogin(currentOrgRemoteAccess[0].vpn_login)
    //             setEditOrgRdpVpnPassword(currentOrgRemoteAccess[0].vpn_password)
    //             setEditOrgRdpVpnType(currentOrgRemoteAccess[0].vpn_type)
    //             setEditOrgRdpIp(currentOrgRemoteAccess[0].rdp_ip)
    //             setEditOrgRdpLogin(currentOrgRemoteAccess[0].rdp_login)
    //             setEditOrgRdpPassword(currentOrgRemoteAccess[0].rdp_password)
    //             setEditOrgRdpWindowsLogin(currentOrgRemoteAccess[0].windows_login)
    //             setEditOrgRdpWindowsPassword(currentOrgRemoteAccess[0].windows_password)
    //         }

    //     }
    //     if (view === 'database') setDatabaseEditModal(true)
    //     if (view === 'queue') setQueueEditModal(true)
    //     if (view === 'egisz') setEgiszEditModal(true)
    //     if (view === 'contacts') setContactsEditModal(true)
    // }

    // const deleteOrg = () => {
    //     org_delete(orgIdNum)
    //     setDeleteConfirmModal(false)
    //     navigate(routes.ADMIN_ROUTE)
    // }

    // const applyEditAnydesk = () => {
    //     anydesk_update(currentOrgRemoteAccess[0].anydesk_id, editOrgAnydeskId, editOrgAnydeskPassword)
    //     getRemoteAccess(orgIdNum, editOrgRemoteAccess)
    //     setMainEditModal(false)
    // }


    // const applyEditOrg = () => {
    //     if (currentOrg.remote_access === editOrgRemoteAccess) {
    //         if(editOrgRemoteAccess === 'anydesk') anydesk_update(currentOrgRemoteAccess[0].anydesk_id, editOrgAnydeskId, editOrgAnydeskPassword)
    //         if(editOrgRemoteAccess === 'rdp') rdp_update(currentOrgRemoteAccess[0].rdp_id, editOrgRdpVpnIp, editOrgRdpVpnLogin, editOrgRdpVpnPassword, editOrgRdpVpnType, editOrgRdpIp, editOrgRdpLogin, editOrgRdpPassword, editOrgRdpWindowsLogin, editOrgRdpWindowsPassword)
    //         getRemoteAccess(orgIdNum, editOrgRemoteAccess)
    //         org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
    //         setMainEditModal(false)
    //     }
    //     if(currentOrg.remote_access !== editOrgRemoteAccess && editOrgRemoteAccess === 'anydesk'){
    //         rdp_delete(currentOrgRemoteAccess[0].rdp_id)
    //         anydesk_add(editOrgAnydeskId, orgIdNum, editOrgAnydeskPassword)
    //         org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
    //         setMainEditModal(false)
    //     }
    //     if(currentOrg.remote_access !== editOrgRemoteAccess && editOrgRemoteAccess === 'rdp'){
    //         anydesk_delete(currentOrgRemoteAccess[0].anydesk_id)
    //         rdp_add(orgIdNum, editOrgRdpVpnIp, editOrgRdpVpnLogin, editOrgRdpVpnPassword, editOrgRdpVpnType, editOrgRdpIp, editOrgRdpLogin, editOrgRdpPassword, editOrgRdpWindowsLogin, editOrgRdpWindowsPassword)
    //         org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
    //         setMainEditModal(false)
    //     }
    //     if(currentOrg.remote_access !== editOrgRemoteAccess && editOrgRemoteAccess === 'нет'){
    //         anydesk_delete(currentOrgRemoteAccess[0].anydesk_id)
    //         rdp_delete(currentOrgRemoteAccess[0].rdp_id)
    //         org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
    //         setMainEditModal(false)
    //     }
    // }


    // if (loading) return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    if (error) return <h1>{error}</h1>
    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
                <h2 className={s.appTitle}><img className={s.logoImg} src={appLogo}></img> CLIENTIX 2.0</h2>

                <NavLink to='/tech' className={s.backBtn}>
                    <img src={backBtnImg} alt="" />
                </NavLink>

            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    <h3 className={s.pageTitle}>Карточка организации</h3>

                    <div className={s.headerPanel}>
                        <div className={s.editOrgBtn}>Редактировать</div>
                        <div className={s.deleteOrgBtn}>Удалить организацию</div>
                    </div>
                </div>


                <div className={s.OrgCardContainer}>
                    <h3 className={s.orgTitle}>{currentOrg.ORG_NAME}</h3>
                    <div className={s.orgInfoContainer}>
                        {
                            currentOrg.ORG_COMMENT || currentOrg.ORG_CITY || currentOrg.ORG_REMOTE_ACCESS_TYPE || currentOrg.ORG_SIMED_ADMIN_PASS ?
                                <div>
                                    {
                                        currentOrg.ORG_CITY &&
                                        <div>
                                            <p className={s.orgInfoCity}> <span className={s.infoTitle}>Город:</span> {currentOrg.ORG_CITY}</p>
                                        </div>
                                    }

                                    {
                                        currentOrg.ORG_SIMED_ADMIN_PASS &&
                                        <div>
                                            <hr className={s.customHR} />
                                            <div className={s.copiedSimedPasstextContainer}>
                                                <p className={s.infoTitleSimedPass}>Пароль в Симеде: </p> <div className={s.copiedSimedPasstextBox}><CopiedText text={currentOrg.ORG_SIMED_ADMIN_PASS} /></div>
                                            </div>
                                        </div>
                                    }

                                    {
                                        currentOrg.ORG_REMOTE_ACCESS_TYPE &&
                                        <div className={s.accessTitleHR}>
                                            <hr className={s.customHR_left} />
                                            <p className={s.infoTitleAccessType}>Доступ к серверу - {currentOrg.ORG_REMOTE_ACCESS_TYPE}</p>
                                            <hr className={s.customHR_right} />
                                        </div>
                                    }

                                    {
                                        (() => {
                                            switch (currentOrg.ORG_REMOTE_ACCESS_TYPE) {
                                                case 'ANYDESK':
                                                    return <div className={s.accessInfoMainContainer}>
                                                        <div>
                                                            <div className={s.copiedAccessInfoContainer}>
                                                                <p className={s.infoTitleAccess}>Номер anydesk: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_NUMBER} /></div>
                                                            </div>
                                                            <div className={s.copiedAccessInfoContainer}>
                                                                <p className={s.infoTitleAccess}>Пароль anydesk: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_PASSWORD} /></div>
                                                            </div>
                                                            {currentOrgRemoteAccess[0].ANYDESK_WINDOWS_LOGIN &&
                                                                <div className={s.copiedAccessInfoContainer}>
                                                                    <p className={s.infoTitleAccess}>Логин уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_WINDOWS_LOGIN} /></div>
                                                                </div>
                                                            }
                                                            {currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD &&
                                                                <div className={s.copiedAccessInfoContainer}>
                                                                    <p className={s.infoTitleAccess}>Пароль уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD} /></div>
                                                                </div>
                                                                // <p><span className={s.infoTitle}>Пароль уч. записи windows: </span>{currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD}</p>
                                                            }
                                                        </div>
                                                        {currentOrgRemoteAccess[0].ANYDESK_COMMENT &&
                                                            <div> 
                                                                {/* <span className={s.infoTitle}>Комментарий </span> */}
                                                                <p className={s.anydeskCommentInfoBox}>{currentOrgRemoteAccess[0].ANYDESK_COMMENT}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                case 'RDP':
                                                    return <div>
                                                        данные рдп
                                                    </div>
                                                case 'VPN и RDP':
                                                    return <div>
                                                        данные впн и рдп
                                                    </div>
                                                case 'Описание подключения':
                                                    return <div>
                                                        {currentOrgRemoteAccess[0].OTHER_ACCESS_INFO}
                                                    </div>
                                                default:
                                                    return <div></div>
                                            }
                                        })()
                                    }

                                    {
                                        currentOrg.ORG_COMMENT &&
                                        <div>
                                            <hr className={s.customHR} />
                                            <p className={s.infoTitle}>Комментарий по организации</p>
                                            <p className={s.orgInfoComment}>{currentOrg.ORG_COMMENT}</p>
                                        </div>
                                    }
                                </div>

                                :
                                <div className={s.center}>
                                    <button className={s.addInfoBtn}>Заполнить карточку организации</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgPage;