
import axiosClient from './axiosClient';
const productApi = {
    create(data , config){
        const url = '/product';
        return axiosClient.post(url , data , config);
    },
    get(){
        const url = '/brand';
        return axiosClient.get(url);
    }
}
export default productApi;