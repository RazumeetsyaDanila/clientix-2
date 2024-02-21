import {$authHost} from "./index";

export const tag_add = async (tag_name, group_id, tag_value1, tag_value2, tag_value3) => {
    await $authHost.post('api/admin/add_tag', {tag_name, group_id, tag_value1, tag_value2, tag_value3})
    return ("Тег добавлен!")
}
export const delete_tag = async (tag_name) => {
    await $authHost.post('api/admin/delete_tag', {tag_name})
    return ("Тег удален!")
}
export const update_tag = async (old_tag_name, new_tag_name, tag_value1, tag_value2, tag_value3) => {
    await $authHost.post('api/admin/update_tag', {old_tag_name, new_tag_name, tag_value1, tag_value2, tag_value3})
    return ("Тег изменен!")
}