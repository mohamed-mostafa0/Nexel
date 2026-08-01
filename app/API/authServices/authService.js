import {API} from '../axios'


export const login = (payload) =>{
    return API.get('api/auth/github/authorize')
}

