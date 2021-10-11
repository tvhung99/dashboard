import axiosClient from './axiosClient';

const userApi  = {
    login(data){
        const url = '/login';
        return axiosClient.post(url,data);
    },
    logout(config){
        const url = '/logout';
        return axiosClient.post(url ,[] , config);
    }
}
export default userApi ;