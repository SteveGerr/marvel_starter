

/** Universal class for responses */
class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/characters"
    _apiKey = "apikey=7446ea1b1fc36115b92d708c4f5d1211"

    /** Get resourses */
    getResource = async (url) => {
        let res = await fetch(url);

        /** If responce down */
        if (!res.ok) {
            /** Show error */
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = () => {
        const res = this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
        console.log(res);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

}


export default MarvelService