import axiosClient from './axiosClient';
const CPUApi = {

    // create(data , config){
    //     const url = '/brand';
    //     return axiosClient.post(url , data , config);
    // },
    get(){
        const url = '/cpu/active';
        return axiosClient.get(url);
    }
}
export default CPUApi;