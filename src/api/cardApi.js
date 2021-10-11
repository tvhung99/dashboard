import axiosClient from './axiosClient';
const cardApi = {
    get(){
        const url = '/card/active';
        return axiosClient.get(url);
    }
}
export default cardApi;