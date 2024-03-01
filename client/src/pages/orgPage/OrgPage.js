import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../../components/UI/modal/Modal';
import { org_delete, org_get } from '../../http/clientsAPI';
import { routes } from '../../consts';
import s from './OrgPage.module.scss';
import appLogo from '../../img/tech-alien64.png';
import backBtnImg from '../../img/previous.png';


const OrgPage = () => {
    const params = useParams();
    const orgId = params.id;
    let orgIdNum = +orgId; //string to number

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    let currentOrg = clients.find(clients => clients.ORG_ID == orgId)

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
        // getRemoteAccess(orgIdNum, currentOrg.remote_access)
    }, [])

    // const getRemoteAccess = async (orgIdNum, accessType) => {
    //     if (accessType === "anydesk") {
    //         const accessData = await anydesk_get(orgIdNum)
    //         setCurrentOrgRemoteAccess(accessData)
    //     }
    //     if (accessType === "rdp") {
    //         const accessData = await rdp_get(orgIdNum)
    //         setCurrentOrgRemoteAccess(accessData)
    //     }

    //     // console.log(anydeskData[0].anydesk_id)
    // }

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
    if (error) return <h1 className='centerContainer h-screen text-2xl'>{error}</h1>
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
                </div>
            </div>
        </div>
    );
};

export default OrgPage;