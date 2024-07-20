import axios from 'axios';

const ClienteAxios = axios.create({
    baseURL: 'http://localhost:5003', // Cambia esta URL según la URL de tu servidor
    headers: {
        'Content-Type': 'application/json',
    },
});

export default ClienteAxios;
