import { useHttp } from '../hooks/http.hook'

/** Universal class for responses */
const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp()

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=7446ea1b1fc36115b92d708c4f5d1211"
    const _baseOffset = 210
    /** Загрузка списка персонажей */
    const getAllCharacters = async ( offset = _baseOffset ) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    /** Загрузка одного персонажа */
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    /** Загрузка списка комиксов */
    const getAllComics = async ( offset = _baseOffset ) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            prices: comics.prices,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            url: comics.urls
        }
    }

    return { loading, error, clearError,  getAllCharacters, getCharacter, getAllComics }
}


export default useMarvelService