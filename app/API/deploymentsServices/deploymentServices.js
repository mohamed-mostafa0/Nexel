import { fetchEventSource } from "@microsoft/fetch-event-source"
import { API } from "../axios"

const EVENT_STREAM_CONTENT_TYPE = "text/event-stream"

const MAX_STREAM_RETRIES = 3


class FatalStreamError extends Error {}



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
export const getPorjectDeployment = (projectId , deploymentId)=>{
    return API.get(`/api/projects/${projectId}/deployments/${deploymentId}` , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}

export const listDepolymentsForProject = (projectId)=>{
    return API.get(`/api/projects/${projectId}/deployments` , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}

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

export const getBuildLogs = (projectId , deploymentId)=>{
    return API.get(`/api/projects/${projectId}/deployments/${deploymentId}/logs`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}


export const deployCommit = (projectId,commit)=>{
    return API.post(`/api/projects/${projectId}/deployments` , {commit} , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}



export const streamDeploymentEvents = (projectId, deploymentId, { onStatus, onError } = {}) => {
    const ctrl = new AbortController()
    let retries = 0

    fetchEventSource(
        `${API.defaults.baseURL}/api/projects/${projectId}/deployments/${deploymentId}/events`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            signal: ctrl.signal,
            openWhenHidden: true,
            async onopen(res) {
                const contentType = res.headers.get('content-type') || ''
                if (res.ok && contentType.includes(EVENT_STREAM_CONTENT_TYPE)) return
                throw new FatalStreamError(`Event stream failed (HTTP ${res.status})`)
            },
            onmessage(ev) {
                if (ev.event !== 'status' || !ev.data) return
                try {
                    const { status } = JSON.parse(ev.data)
                    if (status) onStatus?.(status)
                } catch {

                }
            },
            onerror(err) {

                if (err instanceof FatalStreamError || retries >= MAX_STREAM_RETRIES) {
                    onError?.(err)
                    throw err
                }
                retries += 1
            },
        }
    ).catch(() => {

    })

    return ctrl
}


