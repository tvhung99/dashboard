import axiosClient from './axiosClient';
const brandApi = {

    // create(data , config){
    //     const url = '/brand';
    //     return axiosClient.post(url , data , config);
    // },
    get(){
        const url = '/brand';
        return axiosClient.get(url);
    }
}
export default brandApi;