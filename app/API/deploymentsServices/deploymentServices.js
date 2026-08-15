import { API } from "../axios"



export const getDeployments = ()=>{
    return API.get('/api/projects' , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params:{
            deployed:true
        }
    })
}