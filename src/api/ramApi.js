import axiosClient from './axiosClient';
const ramApi = {
    get(){
        const url = '/ram/active';
        return axiosClient.get(url);
    }
}
export default ramApi;