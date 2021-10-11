import axiosClient from './axiosClient';
const typeApi = {
    get(){
        const url = '/class/active';
        return axiosClient.get(url);
    }
}
export default typeApi;