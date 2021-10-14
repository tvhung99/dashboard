
import axiosClient from './axiosClient';
const productApi = {
    create(data , config){
        const url = '/product';
        return axiosClient.post(url , data , config);
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
    deleteProduct(id , config){
        return axiosClient.put('/product/delete/'+id , null, config);
    }
}
export default productApi;