import { useState, useEffect } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

//https://api.themoviedb.org/3/movie/985939?api_key=721d6750ba9b5ef563cde17056b4bdea&language=pt-BR

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "721d6750ba9b5ef563cde17056b4bdea",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    //console.log(response.data);
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("Filme nao encontrado");
                    navigate('/', { replace: true });
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log("Componente Desmontado")
        }

    }, [navigate, id])

    function salvarFilme() {
        // alert("Ta salvo")
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        if (hasFilmes) {
            // alert("Filme já foi adicionado a lista");
            toast.warn("This movie stay in your list")
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        // alert("Filme salvo com sucesso!!")
        toast.success("Filmes salvo com sucesso")
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    // const aval = Math.round(filme.vote_average)
    const aval = Math.floor(filme.vote_average * 10) / 10

    return (
        <div className='filme-info'>
            {/* <h1>ACessando filme {id}</h1> */}
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            {/* <strong>Avaliação: {filme.vote_count}</strong> */}
            <strong>Avaliação: {aval} / 10</strong>


            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`} > Trailer</a>
                </button>
            </div>
        </div >
    )
}

export default Filme;