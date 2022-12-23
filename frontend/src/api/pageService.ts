import axios from "axios";

let headerCof ={};
/* let token = JSON.parse(parent.window.localStorage.getItem('_token'));
headerCof['X-Project-Id'] = parent.window.localStorage.getItem('project_id');
headerCof['X-Project-Name'] = parent.window.localStorage.getItem('project_name');
headerCof['X-User-Name'] = parent.window.localStorage.getItem('username');
headerCof['X-Tenant-Id'] = parent.window.localStorage.getItem('project_id');
headerCof['X-Tenant-Name'] = parent.window.localStorage.getItem('project_name');
headerCof['X-Auth-Token'] = token.token;
headerCof['token'] = token.token; */
const getGraphs =(params:any)=> {
    return axios.get(`/v1/topos/graphs?kind=${params.kind}`,{
        headers: headerCof
    });
}

const getGraphDetail =(id:any)=> {
    return axios.get(`/v1/topos/graphs/${id}`, {
        headers: headerCof
    });
}

const addGraph = (params:any)=> {
    return axios.post('/v1/topos/graphs', params, {
        headers: headerCof
    });
}

const updateGraph = (id:any,params:any)=> {
    return axios.put(`/v1/topos/graphs/${id}`, params, {
        headers: headerCof
    });
}

const removeGraph = (id:any)=> {
    return axios.delete(`/v1/topos/graphs/${id}`, {
        headers: headerCof
    });
}

const getResouceTree =()=>{
    return axios.get('/api/v1/devices/resource_groups', {
        headers: headerCof
    })
}

const getResouceList =(sub_type:any)=>{
    return axios.get('/api/v1/devices/resources?resource_sub_type='+sub_type, {
        headers: headerCof
    })
}

const updateNode = (id:any,node_id:any,params:any)=> {
    return axios.put(`/v1/topos/graphs/${id}/nodes/${node_id}`, params, {
        headers: headerCof
    });
}
const addNode = (id:any,node_id:any,params:any)=> {
    return axios.post(`/v1/topos/graphs/${id}/nodes/${node_id}`, params, {
        headers: headerCof
    });
}

const updateEdge = (id:any,edge_id:any,params:any)=> {
    return axios.put(`/v1/topos/graphs/${id}/links/${edge_id}`, params, {
        headers: headerCof
    });
}
const addEdge = (id:any,edge_id:any,params:any)=> {
    return axios.post(`/v1/topos/graphs/${id}/links/${edge_id}`, params, {
        headers: headerCof
    });
}


export default {
    getGraphs,
    addGraph,
    getGraphDetail,
    updateGraph,
    removeGraph,
    getResouceTree,
    getResouceList,
    updateNode,
    addNode,
    addEdge,
    updateEdge
  };