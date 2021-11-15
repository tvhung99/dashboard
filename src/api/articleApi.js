
import axiosClient from './axiosClient';
const articleApi = {
    create(data , config){
        const url = '/article';
        return axiosClient.post(url , data , config);
    },
    update(id,data,config){
        const url = `/product/${id}`;
        return axiosClient.put(url,data,config);
    },
    // get_active(){
    //     const url = '/product/active';
    //     return axiosClient.get(url);
    // },
    getById(id){
        const url = '/article/'+id;
        return axiosClient.get(url);
    },

}
export default articleApi;