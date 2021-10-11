import axiosClient from './axiosClient';
const screenApi = {
    get(){
        const url = '/screen/active';
        return axiosClient.get(url);
    }
}
export default screenApi;