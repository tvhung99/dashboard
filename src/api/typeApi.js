import axiosClient from './axiosClient';
const typeApi = {
    get(){
        const url = '/class';
        return axiosClient.get(url);
    }
}
export default typeApi;