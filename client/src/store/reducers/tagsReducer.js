import { TagsInitialState } from '../initialState';

export const tagsReducer = (state = TagsInitialState, action) => {
    switch (action.type){
        case 'FETCH_TAGS':
            return {...state, loading: true}
        case 'FETCH_TAGS_SUCCESS':
            return {...state, loading: false, tags: action.payload, error: ''}
        case 'FETCH_TAGS_ERROR':
            return {...state, loading: false, error: action.payload}
        case 'FETCH_TAGS_GROUPS':
            return {...state, loading: true}
        case 'FETCH_TAGS_GROUPS_SUCCESS':
            return {...state, loading: false, tagsGroups: action.payload, error: ''}
        case 'FETCH_TAGS_GROUPS_ERROR':
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}