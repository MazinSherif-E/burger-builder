import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-6fbe2.firebaseio.com/'
});

export default instance;