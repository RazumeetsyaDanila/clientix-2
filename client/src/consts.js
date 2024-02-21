let placeOfWork = 'home' //work - рабочий комп, home - домашний комп, prod - рабочий сервер

export let REACT_APP_API_URL
export let REACT_APP_URL

if(placeOfWork == 'work'){
    REACT_APP_API_URL = 'http://192.168.0.31:5000/'
    REACT_APP_URL = 'http://localhost:3000/'
}
if(placeOfWork == 'home'){
    REACT_APP_API_URL = 'http://192.168.0.14:5000/'
    REACT_APP_URL = 'http://localhost:3000/'
}
if(placeOfWork == 'prod'){
    REACT_APP_API_URL = 'http://192.168.0.56:5000/'
    REACT_APP_URL = 'http://clientix.local:322/'
}

// enum только для ts
export const routes = {
    ADMIN_ROUTE: '/admin',
    SLAVE_ROUTE: '/slave',
    LOGIN_ROUTE: '/login',
    REAUTH_ROUTE: '/reauth',
    REGISTRATION_ROUTE: '/registration',
    USERS_ROUTE: '/users',
    ORG_ADD_ROUTE: '/org_add',
    TAGS_ROUTE: '/tags',
    TAGS_ADD_ROUTE: '/tag_add',
    ORG_ROUTE: '/org/:id',
    FILES_ROUTE: '/file'
}

export const correct_routes = ['admin', 'slave', 'login', 'users', 'registration', 'org_add', 'tags', 'tag_add', 'file', 'org', 'reauth']