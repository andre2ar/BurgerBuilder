import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'https://burgerbuilder-6e061.firebaseio.com/'
});

export default AxiosInstance;