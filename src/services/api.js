import axios from 'axios';

//base da URL https://api.themoviedb.org/3/
//url da API: movie/now_playing?api_key=721d6750ba9b5ef563cde17056b4bdea&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
