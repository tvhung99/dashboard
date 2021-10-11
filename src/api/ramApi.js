import axiosClient from './axiosClient';
const ramApi = {
    get(){
        const url = '/ram';
        return axiosClient.get(url);
    }
}
export default ramApi;