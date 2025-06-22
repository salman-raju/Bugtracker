import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // change if your backend is on a different port
  withCredentials: true,
});

export default instance;