import {$authHost} from "./index";

export const anydesk_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_anydesk', {org_id})
    return (data)
}

export const anydesk_add = async (org_id, anydesk_number, anydesk_password, anydesk_windows_login, anydesk_windows_password, anydesk_comment) => {
    await $authHost.post('api/user/add_anydesk', {org_id, anydesk_number, anydesk_password, anydesk_windows_login, anydesk_windows_password, anydesk_comment})
    return ("Добавлено!")
}

export const anydesk_delete = async (org_id) => {
    await $authHost.post('api/user/delete_anydesk', {org_id})
    return ("Удалено!")
}

export const rdp_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_rdp', {org_id})
    return (data)
}

export const rdp_delete = async (org_id) => {
    await $authHost.post('api/user/delete_rdp', {org_id})
    return ("RDP удален!")
}

export const rdp_add = async (org_id, rdp_ip, rdp_login, rdp_password, rdp_comment) => {
    await $authHost.post('api/user/add_rdp', {org_id, rdp_ip, rdp_login, rdp_password, rdp_comment})
    return ("Добавлено!")
}

export const vpn_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_vpn', {org_id})
    return (data)
}

export const vpn_add = async (org_id, vpn_info) => {
    const {data} = await $authHost.post('api/user/add_vpn', {org_id, vpn_info})
    return (data)
}

export const vpn_delete = async (org_id) => {
    const {data} = await $authHost.post('api/user/delete_vpn', {org_id})
    return (data)
}

export const other_access_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_other_access', {org_id})
    return (data)
}

export const other_access_add = async (org_id, other_access_info) => {
    const {data} = await $authHost.post('api/user/add_other_access', {org_id, other_access_info})
    return (data)
}

export const other_access_delete = async (org_id) => {
    const {data} = await $authHost.post('api/user/delete_other_access', {org_id})
    return (data)
}

export const org_add = async (org_name, org_city) => {
    const {data} = await $authHost.post('api/user/add_org', {org_name, org_city})
    return (data)
}

export const org_delete = async (org_id) => {
    await $authHost.post('api/user/delete_org', {org_id})
    return ("Удалено!")
}

export const org_update = async (org_id, org_name, simed_admin_pass, sql_sa_pass, remote_access_type, city, comment) => {
    const {data} = await $authHost.post('api/user/update_org', {org_id, org_name, simed_admin_pass, sql_sa_pass, remote_access_type, city, comment})
    return (data)
}

export const org_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_org', {org_id})
    return (data)
}

export const egisz_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_egisz', {org_id})
    return (data)
}

export const egisz_add = async (org_id, egisz_idlpu, egisz_guid, egisz_nhealth_login, egisz_nhealth_password, egisz_gateway_pc_ip, egisz_gateway_pc_login, egisz_gateway_pc_password, egisz_comment) => {
    const {data} = await $authHost.post('api/user/add_egisz', {org_id, egisz_idlpu, egisz_guid, egisz_nhealth_login, egisz_nhealth_password, egisz_gateway_pc_ip, egisz_gateway_pc_login, egisz_gateway_pc_password, egisz_comment})
    return (data)
}

export const egisz_delete = async (org_id) => {
    await $authHost.post('api/user/delete_egisz', {org_id})
    return ("Удалено!")
}

// export const org_delete = async (org_id) => {
//     await $authHost.post('api/admin/delete_org', {org_id})
//     return ("Удалено!")
// }



// export const anydesk_add = async (anydesk_id, org_id, anydesk_password) => {
//     await $authHost.post('api/user/add_anydesk', {anydesk_id, org_id, anydesk_password})
//     return ("Добавлено!")
// }

// export const anydesk_delete = async (anydesk_id) => {
//     await $authHost.post('api/user/delete_anydesk', {anydesk_id})
//     return ("Удалено!")
// }

// export const anydesk_update = async (anydesk_id, new_anydesk_id, anydesk_password) => {
//     await $authHost.post('api/user/update_anydesk', {anydesk_id, new_anydesk_id, anydesk_password})
//     return ("Изменено!")
// }







// export const rdp_update = async (rdp_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password) => {
//     await $authHost.post('api/user/update_rdp', {rdp_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password})
//     return ("Обновлено!")
// }