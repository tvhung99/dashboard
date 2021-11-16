import axiosClient from './axiosClient';
const upload = {
    upload(data , config){
        const url = '/upload';
        return axiosClient.post(url , data , config );
    }
}
export default upload;