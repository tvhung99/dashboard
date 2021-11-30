import axiosClient from './axiosClient';
const cateRamApi = {

    // create(data , config){
    //     const url = '/brand';
    //     return axiosClient.post(url , data , config);
    // },
    get(){
        const url = '/capacityram/active';
        return axiosClient.get(url);
    },
    create(){
        
    }
}
export default cateRamApi;