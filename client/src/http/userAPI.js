import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const jwtDecode = require('jwt-decode');

export const registration = async (login, password, role) => {
    const {data} = await $authHost.post('api/admin/registration', {login, password, role})
    return ("Пользователь добавлен!")
}

export const loginf = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}