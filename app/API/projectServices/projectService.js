import { API } from "../axios"




export const getUserPorjects = ()=>{
    return API.get('/api/github/repos' , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
}


export const connectProject = (payload)=>{
  return API.post('/api/projects' , payload , {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export const triggerDeplyoment = (projectId)=>{
  return API.post(`/api/projects/${projectId}/deployments` , {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export const getDeployments = (projectId,deploymentId)=>{
  return API.get(`/api/projects/${projectId}/deployments/${deploymentId}` , {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
}