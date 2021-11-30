
import axiosClient from './axiosClient';
const productApi = {
    create(data , config){
        const url = '/product';
        return axiosClient.post(url , data , config);
    },
    count(url){
        return axiosClient.get(url);
    },
    update(id,data,config){
        const url = `/product/${id}`;
        return axiosClient.put(url,data,config);
    },
    undo(id,config){
        const url = `/product/undo/${id}`;
        return axiosClient.put(url,null,config);
    },
    get_active(){
        const url = '/product/active';
        return axiosClient.get(url);
    },
    getById(id){
        const url = '/product/'+id;
        return axiosClient.get(url);
    },
    getProductActiveDetail(params){
        return axiosClient.get('/product/active' ,{params} );
    },
    getDeletedProduct(params){
        return axiosClient.get('/product/deleted' ,{params} );
    },
    deleteProduct(id , config){
        return axiosClient.put('/product/delete/'+id , null, config);
    }
}
export default productApi;