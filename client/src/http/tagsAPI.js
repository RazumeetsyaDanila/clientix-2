import {$authHost} from "./index";

export const tag_add = async (tag_name, group_id, tag_value1, tag_value2, tag_value3) => {
    await $authHost.post('api/tech/add_tag', {tag_name, group_id, tag_value1, tag_value2, tag_value3})
    return ("Тег добавлен!")
}

export const update_tag = async (tag_id, new_tag_name, tag_value1, tag_value2, tag_value3) => {
    await $authHost.post('api/tech/update_tag', {tag_id, new_tag_name, tag_value1, tag_value2, tag_value3})
    return ("Тег изменен!")
}

export const delete_tag = async (tag_id) => {
    await $authHost.post('api/tech/delete_tag', {tag_id})
    return ("Тег удален!")
}