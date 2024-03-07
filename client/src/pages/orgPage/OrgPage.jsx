import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Modal from '../../components/UI/modal/Modal';
import { anydesk_get, rdp_get, vpn_get, other_access_get, org_delete, org_get, org_update, rdp_add, rdp_delete, anydesk_add, anydesk_delete, other_access_add, other_access_delete, vpn_add, vpn_delete, egisz_add, egisz_get, egisz_delete } from '../../http/clientsAPI';
import { routes } from '../../consts';
import s from './OrgPage.module.scss';
import appLogo from '../../img/tech-alien64.png';
import backBtnImg from '../../img/previous.png';
import CopiedText from '../../components/UI/copiedText/CopiedText';


const OrgPage = () => {
    const params = useParams();
    const orgId = params.id;
    let orgIdNum = +orgId; //string to number

    const { fetchClients } = useActions()

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    let currentOrg = clients.find(clients => clients.ORG_ID == orgId)
    // const [currentOrg, setCurrentOrg] = useState([{}])


    const [currentOrgRemoteAccess, setCurrentOrgRemoteAccess] = useState([{}])
    const [currentOrgVpn, setCurrentOrgVpn] = useState([{}])
    const [currentOrgEgisz, setCurrentOrgEgisz] = useState([{}])


    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const [editOrgName, setEditOrgName] = useState('')
    const [editOrgCity, setEditOrgCity] = useState('')
    const [editOrgSimedAdminPass, setEditOrgSimedAdminPass] = useState('')
    const [editOrgSqlSaPass, setEditOrgSqlSaPass] = useState('')
    const [editOrgComment, setEditOrgComment] = useState('')

    const [editOrgRemoteAccess, setEditOrgRemoteAccess] = useState('')

    const [editOrgAnydeskNumber, setEditOrgAnydeskNumber] = useState('')
    const [editOrgAnydeskPassword, setEditOrgAnydeskPassword] = useState('')
    const [editOrgAnydeskWinLogin, setEditOrgAnydeskWinLogin] = useState('')
    const [editOrgAnydeskWinPassword, setEditOrgAnydeskWinPassword] = useState('')
    const [editOrgAnydeskComment, setEditOrgAnydeskComment] = useState('')

    const [editOrgRdpIp, setEditOrgRdpIp] = useState('')
    const [editOrgRdpLogin, setEditOrgRdpLogin] = useState('')
    const [editOrgRdpPassword, setEditOrgRdpPassword] = useState('')
    const [editOrgRdpComment, setEditOrgRdpComment] = useState('')

    const [editOrgVpnInfo, setEditOrgVpnInfo] = useState('')

    const [editOrgDescAccess, setEditOrgDescAccess] = useState('')

    const [editOrgEgiszIdlpu, setEditOrgEgiszIdlpu] = useState('')
    const [editOrgEgiszGuid, setEditOrgEgiszGuid] = useState('')
    const [editOrgEgiszNhealthLogin, setEditOrgEgiszNhealthLogin] = useState('')
    const [editOrgEgiszNhealthPassword, setEditOrgEgiszNhealthPassword] = useState('')
    const [editOrgEgiszGatewayPcIp, setEditOrgEgiszGatewayPcIp] = useState('')
    const [editOrgEgiszGatewayPcLogin, setEditOrgEgiszGatewayPcLogin] = useState('')
    const [editOrgEgiszGatewayPcPassword, setEditOrgEgiszGatewayPcPassword] = useState('')
    const [editOrgEgiszComment, setEditOrgEgiszComment] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        // fetchClients()
        // setCurrentOrg(clients.find(clients => clients.ORG_ID == orgId))
        getRemoteAccess(orgIdNum, currentOrg.ORG_REMOTE_ACCESS_TYPE)
        getEgisz(orgIdNum)

    }, [])

    // useLayoutEffect(() => {
    //     // fetchClients() //ломает удаление
    //     setCurrentOrg(clients.find(clients => clients.ORG_ID == orgId))
    //     getRemoteAccess(orgIdNum, currentOrg.ORG_REMOTE_ACCESS_TYPE)
    // }, [clients])

    const getEgisz = async (orgIdNum) => {
        const egiszData = await egisz_get(orgIdNum)
        setCurrentOrgEgisz(egiszData)
    }

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
            const accessData = await rdp_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
            const vpn = await vpn_get(orgIdNum)
            setCurrentOrgVpn(vpn)
        }
        if (accessType === "Описание подключения") {
            const accessData = await other_access_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
        }
    }

    const startDeleteOrg = () => {
        setDeleteConfirmModal(true)
    }

    const startEditOrg = () => {
        setEditModal(true)

        setEditOrgName(currentOrg.ORG_NAME)
        currentOrg.ORG_REMOTE_ACCESS_TYPE && setEditOrgRemoteAccess(currentOrg.ORG_REMOTE_ACCESS_TYPE)
        currentOrg.ORG_CITY && setEditOrgCity(currentOrg.ORG_CITY)
        currentOrg.ORG_SIMED_ADMIN_PASS && setEditOrgSimedAdminPass(currentOrg.ORG_SIMED_ADMIN_PASS)
        currentOrg.ORG_SQL_SA_PASS && setEditOrgSqlSaPass(currentOrg.ORG_SQL_SA_PASS)
        currentOrg.ORG_COMMENT && setEditOrgComment(currentOrg.ORG_COMMENT)

        currentOrgRemoteAccess[0].ANYDESK_NUMBER && setEditOrgAnydeskNumber(currentOrgRemoteAccess[0].ANYDESK_NUMBER)
        currentOrgRemoteAccess[0].ANYDESK_PASSWORD && setEditOrgAnydeskPassword(currentOrgRemoteAccess[0].ANYDESK_PASSWORD)
        currentOrgRemoteAccess[0].ANYDESK_WINDOWS_LOGIN && setEditOrgAnydeskWinLogin(currentOrgRemoteAccess[0].ANYDESK_WINDOWS_LOGIN)
        currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD && setEditOrgAnydeskWinPassword(currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD)
        currentOrgRemoteAccess[0].ANYDESK_COMMENT && setEditOrgAnydeskComment(currentOrgRemoteAccess[0].ANYDESK_COMMENT)

        currentOrgRemoteAccess[0].RDP_IP && setEditOrgRdpIp(currentOrgRemoteAccess[0].RDP_IP)
        currentOrgRemoteAccess[0].RDP_LOGIN && setEditOrgRdpLogin(currentOrgRemoteAccess[0].RDP_LOGIN)
        currentOrgRemoteAccess[0].RDP_PASSWORD && setEditOrgRdpPassword(currentOrgRemoteAccess[0].RDP_PASSWORD)
        currentOrgRemoteAccess[0].RDP_COMMENT && setEditOrgRdpComment(currentOrgRemoteAccess[0].RDP_COMMENT)


        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_IDLPU && setEditOrgEgiszIdlpu(currentOrgEgisz[0].EGISZ_IDLPU)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_GUID && setEditOrgEgiszGuid(currentOrgEgisz[0].EGISZ_GUID)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_NHEALTH_LOGIN && setEditOrgEgiszNhealthLogin(currentOrgEgisz[0].EGISZ_NHEALTH_LOGIN)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_NHEALTH_PASSWORD && setEditOrgEgiszNhealthPassword(currentOrgEgisz[0].EGISZ_NHEALTH_PASSWORD)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_GATEWAY_PC_IP && setEditOrgEgiszGatewayPcIp(currentOrgEgisz[0].EGISZ_GATEWAY_PC_IP)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_GATEWAY_PC_LOGIN && setEditOrgEgiszGatewayPcLogin(currentOrgEgisz[0].EGISZ_GATEWAY_PC_LOGIN)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_GATEWAY_PC_PASSWORD && setEditOrgEgiszGatewayPcPassword(currentOrgEgisz[0].EGISZ_GATEWAY_PC_PASSWORD)
        currentOrgEgisz.length > 0 && currentOrgEgisz[0].EGISZ_COMMENT && setEditOrgEgiszComment(currentOrgEgisz[0].EGISZ_COMMENT)

        currentOrgRemoteAccess[0].OTHER_ACCESS_INFO && setEditOrgDescAccess(currentOrgRemoteAccess[0].OTHER_ACCESS_INFO)

        currentOrgVpn[0].VPN_INFO && setEditOrgVpnInfo(currentOrgVpn[0].VPN_INFO)
    }

    const deleteOrg = async () => {
        await egisz_delete(orgIdNum)
        await anydesk_delete(orgIdNum)
        await other_access_delete(orgIdNum)
        await rdp_delete(orgIdNum)
        await org_delete(orgIdNum)

        // fetchClients()
        setDeleteConfirmModal(false)
        setTimeout(() => { navigate(routes.TECH_ROUTE) }, 200)
    }

    const applyEditOrg = async () => {
        org_update(orgIdNum, editOrgName, editOrgSimedAdminPass, editOrgSqlSaPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
        await egisz_delete(orgIdNum)
        if (editOrgEgiszIdlpu || editOrgEgiszGuid || editOrgEgiszNhealthLogin || editOrgEgiszNhealthPassword || editOrgEgiszGatewayPcIp || editOrgEgiszGatewayPcLogin || editOrgEgiszGatewayPcPassword || editOrgEgiszComment) {
            await egisz_add(orgIdNum, editOrgEgiszIdlpu, editOrgEgiszGuid, editOrgEgiszNhealthLogin, editOrgEgiszNhealthPassword, editOrgEgiszGatewayPcIp, editOrgEgiszGatewayPcLogin, editOrgEgiszGatewayPcPassword, editOrgEgiszComment)
        }
        // fetchClients()
        navigate(routes.TECH_ROUTE)
        // setEditModal(false)
        // setCurrentOrg(clients.find(clients => clients.ORG_ID == orgId))
        switch (editOrgRemoteAccess) {
            case 'RDP':
                await other_access_delete(orgIdNum)
                await anydesk_delete(orgIdNum)
                await rdp_delete(orgIdNum)
                await vpn_delete(orgIdNum)

                await rdp_add(orgIdNum, editOrgRdpIp, editOrgRdpLogin, editOrgRdpPassword, editOrgRdpComment)
                break;
            case 'VPN и RDP':
                await other_access_delete(orgIdNum)
                await anydesk_delete(orgIdNum)
                await rdp_delete(orgIdNum)
                await vpn_delete(orgIdNum)

                await rdp_add(orgIdNum, editOrgRdpIp, editOrgRdpLogin, editOrgRdpPassword, editOrgRdpComment)
                await vpn_add(orgIdNum, editOrgVpnInfo)
                break;
            case 'ANYDESK':
                await other_access_delete(orgIdNum)
                await rdp_delete(orgIdNum)
                await vpn_delete(orgIdNum)
                await anydesk_delete(orgIdNum)

                await anydesk_add(orgIdNum, editOrgAnydeskNumber, editOrgAnydeskPassword, editOrgAnydeskWinLogin, editOrgAnydeskWinPassword, editOrgAnydeskComment)
                break;
            case 'Описание подключения':
                await rdp_delete(orgIdNum)
                await vpn_delete(orgIdNum)
                await anydesk_delete(orgIdNum)
                await other_access_delete(orgIdNum)

                await other_access_add(orgIdNum, editOrgDescAccess)
                break;
            case 'нет':
                await vpn_delete(orgIdNum)
                await anydesk_delete(orgIdNum)
                await rdp_delete(orgIdNum)
                await other_access_delete(orgIdNum)
                break;
            default:
                return 0
        }
    }


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

                    {
                        currentOrg.ORG_COMMENT || currentOrg.ORG_CITY || currentOrg.ORG_REMOTE_ACCESS_TYPE || currentOrg.ORG_SIMED_ADMIN_PASS || currentOrg.ORG_SQL_SA_PASS ?
                            <div className={s.headerPanel}>
                                <div className={s.editOrgBtn} onClick={startEditOrg}>Редактировать</div>
                                <div className={s.deleteOrgBtn} onClick={startDeleteOrg}>Удалить организацию</div>
                            </div>
                            :
                            <div className={s.headerPanelMin}>
                                <div className={s.deleteOrgBtn} onClick={startDeleteOrg}>Удалить организацию</div>
                            </div>
                    }

                </div>


                <div className={s.OrgCardContainer}>
                    <h3 className={s.orgTitle}>{currentOrg.ORG_NAME}</h3>
                    <div className={s.orgInfoContainer}>
                        {
                            currentOrg.ORG_COMMENT || currentOrg.ORG_CITY || currentOrg.ORG_REMOTE_ACCESS_TYPE || currentOrg.ORG_SIMED_ADMIN_PASS || currentOrg.ORG_SQL_SA_PASS ?
                                <div>
                                    {
                                        (currentOrg.ORG_CITY || currentOrg.ORG_SIMED_ADMIN_PASS || currentOrg.ORG_SQL_SA_PASS) &&
                                        <div className={s.mainTitleHR}>
                                            <hr className={s.customHR_left} />
                                            <div> <p className={s.infoTitleAccessType}>Основная информация</p></div>
                                            <hr className={s.customHR_right} />
                                        </div>
                                    }
                                    {
                                        currentOrg.ORG_CITY &&
                                        <div style={{ marginBottom: '10px' }}>
                                            <p className={s.orgInfoCity}> <span className={s.infoTitle}>Город:</span> {currentOrg.ORG_CITY}</p>
                                        </div>
                                    }

                                    {
                                        currentOrg.ORG_SIMED_ADMIN_PASS &&
                                        <div>
                                            {/* <hr className={s.customHR} /> */}
                                            <div className={s.copiedSimedPasstextContainer}>
                                                <p className={s.infoTitleSimedPass}>Пароль в Симеде: </p> <div className={s.copiedSimedPasstextBox}><CopiedText text={currentOrg.ORG_SIMED_ADMIN_PASS} /></div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        currentOrg.ORG_SQL_SA_PASS &&
                                        <div>
                                            {/* <hr className={s.customHR} /> */}
                                            <div className={s.copiedSimedPasstextContainer}>
                                                <p className={s.infoTitleSimedPass}>Пароль SA: </p> <div className={s.copiedSimedPasstextBox}><CopiedText text={currentOrg.ORG_SQL_SA_PASS} /></div>
                                            </div>
                                        </div>
                                    }

                                    {
                                        (currentOrg.ORG_REMOTE_ACCESS_TYPE && currentOrg.ORG_REMOTE_ACCESS_TYPE != 'нет') &&
                                        <div className={s.accessTitleHR}>
                                            <hr className={s.customHR_left} />
                                            <div>
                                                <p className={s.infoTitleAccessType}>Доступ к серверу </p>
                                                <p className={s.infoTitleAccessType}>{currentOrg.ORG_REMOTE_ACCESS_TYPE}</p>
                                            </div>
                                            <hr className={s.customHR_right} />
                                        </div>
                                    }

                                    {
                                        (() => {
                                            switch (currentOrg.ORG_REMOTE_ACCESS_TYPE) {
                                                case 'ANYDESK':
                                                    return <div className={s.accessInfoMainContainer}>
                                                        <div>
                                                            {
                                                                currentOrgRemoteAccess[0].ANYDESK_NUMBER &&
                                                                <div className={s.copiedAccessInfoContainer}>
                                                                    <p className={s.infoTitleAccess}>Номер anydesk: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_NUMBER} /></div>
                                                                </div>
                                                            }

                                                            {
                                                                currentOrgRemoteAccess[0].ANYDESK_PASSWORD &&
                                                                <div className={s.copiedAccessInfoContainer}>
                                                                    <p className={s.infoTitleAccess}>Пароль anydesk: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_PASSWORD} /></div>
                                                                </div>
                                                            }

                                                            {
                                                                currentOrgRemoteAccess[0].ANYDESK_WINDOWS_LOGIN &&
                                                                <div className={s.copiedAccessInfoContainer}>
                                                                    <p className={s.infoTitleAccess}>Логин уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_WINDOWS_LOGIN} /></div>
                                                                </div>
                                                            }

                                                            {
                                                                currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD &&
                                                                <div className={s.copiedAccessInfoContainer}>
                                                                    <p className={s.infoTitleAccess}>Пароль уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD} /></div>
                                                                </div>
                                                                // <p><span className={s.infoTitle}>Пароль уч. записи windows: </span>{currentOrgRemoteAccess[0].ANYDESK_WINDOWS_PASSWORD}</p>
                                                            }
                                                        </div>
                                                        {currentOrgRemoteAccess[0].ANYDESK_COMMENT &&
                                                            <div>
                                                                {/* <span className={s.infoTitle}>Комментарий </span> */}
                                                                <div className={s.anydeskCommentInfoBox}> <p className={s.infoTitleAccess}>Комментарий: </p> {currentOrgRemoteAccess[0].ANYDESK_COMMENT}</div>
                                                            </div>
                                                        }
                                                    </div>
                                                case 'RDP':
                                                    return <div className={s.accessInfoMainContainer}>
                                                        <div>
                                                            <div className={s.copiedAccessInfoContainer}>
                                                                <p className={s.infoTitleAccess}>IP адрес RDP: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].RDP_IP} /></div>
                                                            </div>
                                                            <div className={s.copiedAccessInfoContainer}>
                                                                <p className={s.infoTitleAccess}>Логин уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].RDP_LOGIN} /></div>
                                                            </div>
                                                            <div className={s.copiedAccessInfoContainer}>
                                                                <p className={s.infoTitleAccess}>Пароль уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].RDP_PASSWORD} /></div>
                                                            </div>
                                                        </div>
                                                        {currentOrgRemoteAccess[0].RDP_COMMENT &&
                                                            <div>
                                                                <div className={s.anydeskCommentInfoBox}> <p className={s.infoTitleAccess}>Комментарий: </p> {currentOrgRemoteAccess[0].RDP_COMMENT}</div>
                                                            </div>
                                                        }
                                                    </div>
                                                case 'VPN и RDP':
                                                    return <div>
                                                        <div className={s.accessInfoMainContainer}>
                                                            <div>
                                                                {
                                                                    currentOrgRemoteAccess[0].RDP_IP &&
                                                                    <div className={s.copiedAccessInfoContainer}>
                                                                        <p className={s.infoTitleAccess}>IP адрес RDP: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].RDP_IP} /></div>
                                                                    </div>
                                                                }

                                                                {
                                                                    currentOrgRemoteAccess[0].RDP_LOGIN &&
                                                                    <div className={s.copiedAccessInfoContainer}>
                                                                        <p className={s.infoTitleAccess}>Логин уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].RDP_LOGIN} /></div>
                                                                    </div>
                                                                }

                                                                {
                                                                    currentOrgRemoteAccess[0].RDP_PASSWORD &&
                                                                    <div className={s.copiedAccessInfoContainer}>
                                                                        <p className={s.infoTitleAccess}>Пароль уч. записи windows: </p> <div className={s.copiedAccessTextBox}> <CopiedText text={currentOrgRemoteAccess[0].RDP_PASSWORD} /></div>
                                                                    </div>
                                                                }

                                                            </div>
                                                            <div className={s.vpnInfoBox}>
                                                                <p className={s.infoTitleAccess}>VPN: </p> <div>{currentOrgVpn[0].VPN_INFO}</div>
                                                            </div>
                                                        </div>
                                                        {currentOrgRemoteAccess[0].RDP_COMMENT &&
                                                            <div>
                                                                {/* <p className={s.orgInfoComment}>{currentOrgRemoteAccess[0].RDP_COMMENT}</p> */}
                                                            </div>
                                                        }
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
                                        (currentOrgEgisz.length > 0) &&
                                        <div className={s.accessTitleHR}>
                                            <hr className={s.customHR_left} />
                                            <div>
                                                <p className={s.infoTitleAccessType}> ЕГИСЗ </p>
                                            </div>
                                            <hr className={s.customHR_right} />
                                        </div>
                                    }

                                    {
                                        (currentOrgEgisz.length > 0) &&
                                        <div className={s.accessInfoMainContainer}>
                                            <div>
                                                {
                                                    currentOrgEgisz[0].EGISZ_IDLPU &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>IDLPU: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_IDLPU} /></div>
                                                    </div>
                                                }

                                                {
                                                    currentOrgEgisz[0].EGISZ_GUID &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>GUID: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_GUID} /></div>
                                                    </div>
                                                }

                                                {
                                                    currentOrgEgisz[0].EGISZ_NHEALTH_LOGIN &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>Логин N3Health: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_NHEALTH_LOGIN} /></div>
                                                    </div>
                                                }

                                                {
                                                    currentOrgEgisz[0].EGISZ_NHEALTH_PASSWORD &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>Пароль N3Health: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_NHEALTH_PASSWORD} /></div>
                                                    </div>
                                                }

                                                {
                                                    currentOrgEgisz[0].EGISZ_GATEWAY_PC_IP &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>IP шлюза: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_GATEWAY_PC_IP} /></div>
                                                    </div>
                                                }

                                                {
                                                    currentOrgEgisz[0].EGISZ_GATEWAY_PC_LOGIN &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>Логин шлюза: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_GATEWAY_PC_LOGIN} /></div>
                                                    </div>
                                                }

                                                {
                                                    currentOrgEgisz[0].EGISZ_GATEWAY_PC_PASSWORD &&
                                                    <div className={s.copiedEgiszInfoContainer}>
                                                        <p className={s.infoTitleAccess}>Пароль шлюза: </p> <div className={s.copiedEgiszTextBox}> <CopiedText text={currentOrgEgisz[0].EGISZ_GATEWAY_PC_PASSWORD} /></div>
                                                    </div>
                                                }
                                            </div>
                                            {currentOrgEgisz[0].EGISZ_COMMENT &&
                                                <div>
                                                    <div className={s.egiszCommentInfoBox}> <p className={s.infoTitleAccess}>Комментарий: </p> {currentOrgEgisz[0].EGISZ_COMMENT}</div>
                                                </div>
                                            }
                                        </div>
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
                                    <button className={s.addInfoBtn} onClick={startEditOrg}>Заполнить карточку организации</button>
                                </div>
                        }
                    </div>
                </div>

            </div>

            <Modal visible={deleteConfirmModal} setVisible={setDeleteConfirmModal}>
                <div>
                    <p className={s.deleteModalTitle}>Удалить?</p>
                    <div className={s.deleteModalYesNo}>
                        <button className={s.deleteModalYesBtn} onClick={deleteOrg}>Да</button>
                        <button onClick={() => setDeleteConfirmModal(false)}>Нет</button>
                    </div>
                </div>
            </Modal>

            {/* модальное окно редактирования */}
            <Modal visible={editModal} setVisible={setEditModal}>
                <div className={s.editModalContainer}>
                    <div className={s.editInputContainer}>
                        <div className={s.editMainInputContainer}>
                            <h2 className={s.editPartTitle}> Основная информация </h2>
                            <p className={s.editOrgInputLabel}>Наименование организации</p>
                            <input className={s.editOrgInput} type="text" placeholder="Наименование организации" value={editOrgName} onChange={e => setEditOrgName(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Город</p>
                            <input className={s.editOrgInput} type="text" placeholder="Город" value={editOrgCity} onChange={e => setEditOrgCity(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Пароль администратора в Симеде</p>
                            <input className={s.editOrgInput} type="text" placeholder="Пароль администратора в Симеде" value={editOrgSimedAdminPass} onChange={e => setEditOrgSimedAdminPass(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Пароль SA</p>
                            <input className={s.editOrgInput} type="text" placeholder="Пароль SA" value={editOrgSqlSaPass} onChange={e => setEditOrgSqlSaPass(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Комментарий</p>
                            <textarea className={s.editOrgTextarea} type="text" value={editOrgComment} onChange={e => setEditOrgComment(e.target.value)} />
                        </div>

                        <div className={s.editAccessInputContainer}>
                            <h2 className={s.editPartTitle}> Удаленный доступ </h2>

                            <p className={s.editOrgInputLabel}>Тип подключения</p>
                            <select className={s.editOrgSelect} value={editOrgRemoteAccess} onChange={e => setEditOrgRemoteAccess(e.target.value)} >
                                <option value={'нет'}>нет</option>
                                <option value={'ANYDESK'}>ANYDESK</option>
                                <option value={'RDP'}>RDP</option>
                                <option value={'VPN и RDP'}>VPN и RDP</option>
                                <option value={'Описание подключения'}>Описание подключения</option>
                            </select>

                            {
                                (() => {
                                    switch (editOrgRemoteAccess) {
                                        case 'ANYDESK':
                                            return <div className={s.editOrgAccessBox}>
                                                <p className={s.editOrgInputLabel}>Номер</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Номер" value={editOrgAnydeskNumber} onChange={e => setEditOrgAnydeskNumber(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Пароль</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Пароль" value={editOrgAnydeskPassword} onChange={e => setEditOrgAnydeskPassword(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Логин уч. записи windows</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Логин уч. записи windows" value={editOrgAnydeskWinLogin} onChange={e => setEditOrgAnydeskWinLogin(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Пароль уч. записи windows</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Пароль уч. записи windows" value={editOrgAnydeskWinPassword} onChange={e => setEditOrgAnydeskWinPassword(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Комментарий</p>
                                                <textarea className={s.editOrgAnydeskComment} type="text" value={editOrgAnydeskComment} onChange={e => setEditOrgAnydeskComment(e.target.value)} />
                                            </div>
                                        case 'RDP':
                                            return <div className={s.editOrgAccessBox}>
                                                <p className={s.editOrgInputLabel}>IP</p>
                                                <input className={s.editOrgInput} type="text" placeholder="IP" value={editOrgRdpIp} onChange={e => setEditOrgRdpIp(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Логин</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Логин" value={editOrgRdpLogin} onChange={e => setEditOrgRdpLogin(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Пароль</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Пароль" value={editOrgRdpPassword} onChange={e => setEditOrgRdpPassword(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Комментарий</p>
                                                <textarea className={s.editOrgTextarea} type="text" value={editOrgRdpComment} onChange={e => setEditOrgRdpComment(e.target.value)} />
                                            </div>
                                        case 'VPN и RDP':
                                            return <div className={s.editOrgAccessBox}>
                                                <p className={s.editOrgInputLabel}>IP</p>
                                                <input className={s.editOrgInput} type="text" placeholder="IP" value={editOrgRdpIp} onChange={e => setEditOrgRdpIp(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Логин</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Логин" value={editOrgRdpLogin} onChange={e => setEditOrgRdpLogin(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>Пароль</p>
                                                <input className={s.editOrgInput} type="text" placeholder="Пароль" value={editOrgRdpPassword} onChange={e => setEditOrgRdpPassword(e.target.value)} />

                                                <p className={s.editOrgInputLabel}>VPN</p>
                                                <textarea className={s.editOrgTextarea} type="text" value={editOrgVpnInfo} onChange={e => setEditOrgVpnInfo(e.target.value)} />
                                            </div>
                                        case 'Описание подключения':
                                            return <div className={s.editOrgAccessBox}>
                                                <p className={s.editOrgInputLabel}>Описание</p>
                                                <textarea className={s.editOrgDescTextarea} type="text" value={editOrgDescAccess} onChange={e => setEditOrgDescAccess(e.target.value)} />
                                            </div>
                                        default:
                                            return <div></div>
                                    }
                                })()
                            }
                        </div>

                        <div className={s.editMainInputContainer}>
                            <h2 className={s.editPartTitle}> ЕГИСЗ </h2>

                            <p className={s.editOrgInputLabel}>IDLPU</p>
                            <input className={s.editOrgInput} type="text" placeholder="IDLPU" value={editOrgEgiszIdlpu} onChange={e => setEditOrgEgiszIdlpu(e.target.value)} />

                            <p className={s.editOrgInputLabel}>GUID</p>
                            <input className={s.editOrgInput} type="text" placeholder="GUID" value={editOrgEgiszGuid} onChange={e => setEditOrgEgiszGuid(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Логин eventlog N3Health</p>
                            <input className={s.editOrgInput} type="text" placeholder="Логин eventlog N3Health" value={editOrgEgiszNhealthLogin} onChange={e => setEditOrgEgiszNhealthLogin(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Пароль eventlog N3Health</p>
                            <input className={s.editOrgInput} type="text" placeholder="Пароль eventlog N3Health" value={editOrgEgiszNhealthPassword} onChange={e => setEditOrgEgiszNhealthPassword(e.target.value)} />

                            <p className={s.editOrgInputLabel}>IP шлюза</p>
                            <input className={s.editOrgInput} type="text" placeholder="IP шлюза" value={editOrgEgiszGatewayPcIp} onChange={e => setEditOrgEgiszGatewayPcIp(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Логин уч. записи шлюза</p>
                            <input className={s.editOrgInput} type="text" placeholder="Логин уч. записи шлюза" value={editOrgEgiszGatewayPcLogin} onChange={e => setEditOrgEgiszGatewayPcLogin(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Пароль уч. записи шлюза</p>
                            <input className={s.editOrgInput} type="text" placeholder="Пароль уч. записи шлюза" value={editOrgEgiszGatewayPcPassword} onChange={e => setEditOrgEgiszGatewayPcPassword(e.target.value)} />

                            <p className={s.editOrgInputLabel}>Комментарий</p>
                            <textarea className={s.editOrgEgiszComment} type="text" value={editOrgEgiszComment} onChange={e => setEditOrgEgiszComment(e.target.value)} />
                        </div>
                    </div>

                    <button className={s.applyEditbtn} onClick={applyEditOrg}>Подтвердить изменения</button>
                </div>
            </Modal>
        </div>
    );
};

export default OrgPage;