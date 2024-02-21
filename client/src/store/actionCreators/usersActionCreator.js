import { Dispatch } from "react"
import { $authHost } from "../../http"


export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_USERS' })
            const { data } = await $authHost.get('api/admin/get_users')
            dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data })


        } catch (e) {
            dispatch({ type: 'FETCH_USERS_ERROR', payload: 'Ошибка при загрузке списка пользователей!' })
        }
    }
}