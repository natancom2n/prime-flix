import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

//url: movie/now_playing?api_key=721d6750ba9b5ef563cde17056b4bdea&language=pt-BR

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            //await == wait the request 
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "721d6750ba9b5ef563cde17056b4bdea",
                    language: "pt-BR",
                    page: 1,

                }
            })
            //console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 30));
            setLoading(false);
        }
        loadFilmes();
    }, [])


    //loading...
    if (loading) {
        return (
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }


    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`} >Acessar</Link>
                        </article>
                    )
                })}

            </div>
        </div>
    )
}

export default Home;