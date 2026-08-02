import { API } from "../axios"




export const getUserPorjects = ()=>{
    return API.get('/api/github/repos' , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
}