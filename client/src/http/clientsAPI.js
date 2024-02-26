import {$authHost} from "./index";

export const anydesk_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_anydesk', {org_id})
    return (data)
}

export const rdp_get = async (org_id) => {
    const {data} = await $authHost.post('api/user/get_rdp', {org_id})
    return (data)
}

// export const org_add = async (org_name, simed_admin_pass, remote_access,  city, comment) => {
//     const {data} = await $authHost.post('api/user/add_org', {org_name, simed_admin_pass, remote_access, city, comment})
//     return (data)
// }
// export const org_update = async (org_id, org_name, simed_admin_pass, remote_access,  city, comment) => {
//     const {data} = await $authHost.post('api/user/update_org', {org_id, org_name, simed_admin_pass, remote_access, city, comment})
//     return (data)
// }

// export const org_delete = async (org_id) => {
//     await $authHost.post('api/admin/delete_org', {org_id})
//     return ("Удалено!")
// }

// export const org_get = async (org_id) => {
//     const {data} = await $authHost.post('api/user/get_org', {org_id})
//     return (data)
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



// export const rdp_add = async (org_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password) => {
//     await $authHost.post('api/user/add_rdp', {org_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password})
//     return ("Добавлено!")
// }

// export const rdp_delete = async (rdp_id) => {
//     await $authHost.post('api/user/delete_rdp', {rdp_id})
//     return ("Добавлено!")
// }

// export const rdp_update = async (rdp_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password) => {
//     await $authHost.post('api/user/update_rdp', {rdp_id, vpn_ip, vpn_login, vpn_password, vpn_type, rdp_ip, rdp_login, rdp_password, windows_login, windows_password})
//     return ("Обновлено!")
// }