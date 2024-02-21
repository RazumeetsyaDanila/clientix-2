import {$authHost, $host} from "./index";

export const get_users = async () => {
    const {data} = await $authHost.get('api/admin/get_users' )
    return data
}

export const delete_user = async (login) => {
    const {data} = await $authHost.post('api/admin/delete_user', {login} )
    return data
}