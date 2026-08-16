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
// export const getPorjectDeployment = (projectId , deploymentId)=>{
//     return API.get(`/api/projects/${projectId}/deployments/${deploymentId}` , {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//         }
//     })
// }

// export const listDepolymentsForProject = (projectId)=>{
//     return API.get(`/api/projects/${projectId}/deployments` , {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//         }
//     })
// }

export const deleteDeployment = (projectId)=>{
    return API.delete(`/api/projects/${projectId}` , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}


export const getPorjectCommits = (projectId , limit)=>{
    return API.get(`/api/projects/${projectId}/commits` , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params:{
            limit
        }
    })
}



