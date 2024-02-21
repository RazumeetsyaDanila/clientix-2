import * as UserActionCreator from './userActionCreator'
import * as UsersActionCreator from './usersActionCreator'
import * as ClientsActionCreator from './clientsActionCreator'
import * as TagsActionCreator from './tagsActionCreator'

export default {
    ...UserActionCreator,
    ...UsersActionCreator,
    ...ClientsActionCreator,
    ...TagsActionCreator
}