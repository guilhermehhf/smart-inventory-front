import axios from 'axios';
const API_URL = 'http://localhost:'
const API_PORT = '4000'
export const api =  axios.create({
    baseURL: API_URL + API_PORT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
});
