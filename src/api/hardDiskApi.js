import axiosClient from './axiosClient';
const hardDiskApi = {

    // create(data , config){
    //     const url = '/brand';
    //     return axiosClient.post(url , data , config);
    // },
    get(){
        const url = '/harddisk/active';
        return axiosClient.get(url);
    }
}
export default hardDiskApi;