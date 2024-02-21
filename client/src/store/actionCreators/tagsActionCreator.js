import { Dispatch } from "react"
import { $authHost } from "../../http"


export const fetchTags = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_TAGS' })
            const { data } = await $authHost.get('api/user/get_tags')
            dispatch({ type: 'FETCH_TAGS_SUCCESS', payload: data })
        } catch (e) {
            dispatch({ type: 'FETCH_TAGS_ERROR', payload: 'Ошибка при загрузке списка тегов!' })
        }
    }
}

export const fetchTagsGroups = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_TAGS_GROUPS' })
            const { data } = await $authHost.get('api/user/get_tags_groups')
            dispatch({ type: 'FETCH_TAGS_GROUPS_SUCCESS', payload: data })
        } catch (e) {
            dispatch({ type: 'FETCH_TAGS_GROUPS_ERROR', payload: 'Ошибка при загрузке списка групп тегов!' })
        }
    }
}