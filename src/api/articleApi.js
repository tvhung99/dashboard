
import axiosClient from './axiosClient';
const articleApi = {
    create(data , config){
        const url = '/article';
        return axiosClient.post(url , data , config);
    },
    update(id,data,config){
        const url = `/article/${id}`;
        return axiosClient.put(url,data,config);
    },
    getActive(params){
        const url = '/article/all';
        return axiosClient.get(url , {params});
    },
    count(url){
        return axiosClient.get(url);
    },
    remove(id,config){
        const url = `/article/delete/${id}`;
        return axiosClient.put(url,null,config);
    },
    getDeleted(){
        const url = '/article/deleted';
        return axiosClient.get(url);
    },
    undo(id , config){
        const url = '/article/undo/'+id;
        return axiosClient.put(url,null,config);
    },
    getById(id){
        const url = '/article/'+id;
        return axiosClient.get(url);
    },

}
export default articleApi;