import { useState, useEffect } from 'react';
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../Services/MarvelServices';

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
                    <a href={item.url[0].url}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price}$</div>
                    </a>
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

    return (
        <div className="comics__list">

            {items}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;