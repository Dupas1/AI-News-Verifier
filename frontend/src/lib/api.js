import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // URL do backend
});

export default api;

const apiUrl = process.env.REACT_APP_API_URL;

fetch(`${apiUrl}/endpoint`)
  .then(response => response.json())
  .then(data => console.log(data));