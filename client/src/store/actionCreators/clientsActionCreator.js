import { Dispatch } from "react"
import { $authHost } from "../../http"


export const fetchClients = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_CLIENTS' })
            const { data } = await $authHost.get('api/user/get_orgs')
            dispatch({ type: 'FETCH_CLIENTS_SUCCESS', payload: data })
        } catch (e) {
            dispatch({ type: 'FETCH_CLIENTS_ERROR', payload: 'Ошибка при загрузке списка организаций!' })
        }
    }
}