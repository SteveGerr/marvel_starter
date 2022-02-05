import { useHttp } from '../hooks/http.hook'

/** Universal class for responses */
const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp()

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=7446ea1b1fc36115b92d708c4f5d1211"
    const _baseOffset = 210

    /**
     * Загрузка списка персонажей
     *  @param {Number} offset - колдичество загружаемого контента. По умолчанию 210
     */
    const getAllCharacters = async ( offset = _baseOffset ) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    /** Загрузка одного персонажа */
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    /**
     * Загрузка списка комиксов
     *  @param {Number} offset - количество загружаемого контента. По умолчанию 210
     */
    const getAllComics = async ( offset = _baseOffset ) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    /**
     * Загрузка одного комикса
     * @param {Number} id - идентификатор комикса
     * @returns {Array}
     */
    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }


    /**
     *
     * @param {Object} comic - ОБъект с данными по одному комиксу
     * @returns
     */
    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            prices: comic.prices,
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            url: comic.urls,
            pageCount: comic.pageCount,
            textObjects: comic.textObjects
        }
    }

    return { loading, error, clearError,  getAllCharacters, getCharacter, getAllComics, getComic }
}


export default useMarvelService