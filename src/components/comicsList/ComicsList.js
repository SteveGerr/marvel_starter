import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import useMarvelService from '../../Services/MarvelServices';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../Spinner/Spinner';

const ComicsList = () => {

    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [comicEnded, setComicEnded] = useState(false)


    const {loading, error, getAllComics} = useMarvelService()

    // useEffect запускается после объявления функции
    useEffect(() => {
        onRequest(offset, true)
    }, [])

    /**
     *
     * @param {Number} offset - количество запрашиваемого контента. По умолчанию 210
     * @param {Boolean} initial
     */
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 9) {
            ended = true;
        }

        setComics(comicsList => [...comics, ...newComicsList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setComicEnded(comicEnded => ended)
    }

    const renderItems = (arr = []) => {
        const items = arr.map((item) => {
            return (
                <li
                    className="comics__item"
                    key={item.id}
                >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price}$</div>
                    </Link>
                </li>

            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;