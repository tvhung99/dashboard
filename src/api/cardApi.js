import axiosClient from './axiosClient';
const cardApi = {
    get(){
        const url = '/card';
        return axiosClient.get(url);
    }
}
export default cardApi;