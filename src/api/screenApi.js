import axiosClient from './axiosClient';
const screenApi = {
    get(){
        const url = '/screen';
        return axiosClient.get(url);
    }
}
export default screenApi;