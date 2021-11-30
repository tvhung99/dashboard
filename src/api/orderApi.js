
import axiosClient from './axiosClient';
const orderApi = {
    // create(data , config){
    //     const url = '/article';
    //     return axiosClient.post(url , data , config);
    // },
    // update(id,data,config){
    //     const url = `/article/${id}`;
    //     return axiosClient.put(url,data,config);
    // },
    getOrders(config){
        const url = '/order';
        return axiosClient.get(url , config);
    },
    // remove(id,config){
    //     const url = `/article/delete/${id}`;
    //     return axiosClient.put(url,null,config);
    // },
    getById(id,config){
        const url = '/order/'+id;
        return axiosClient.get(url , config);
    },
    update(id,data,config){
        const url = `/order/${id}`;
        return axiosClient.put(url,data,config);
    },
    count(config){
        const url = `/order/count`;
        return axiosClient.get(url,config);

    }

}
export default orderApi;