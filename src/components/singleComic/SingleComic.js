import { useState, useEffect } from 'react/cjs/react.development';
import './singleComic.scss';
import useMarvelService from '../../Services/MarvelServices';
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../Spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'

const SingleComic = () => {

    const [comic, setComic] = useState([]);

    const {getComic, loading, error} = useMarvelService()

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = () => {
        let id = 98402
        getComic(id)
            .then(onComicLoaded)
    }

    /** One comic loading */
    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const skeleton = comic || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <SingleComicView comic={comic}/> : null;


    return (
        <div className="single-comic">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const SingleComicView = ({comic}) => {
    const {thumbnail, title, desciption, pageCount, prices, url} = comic

    const displPrice = prices[0].price ? prices[0].price + "$" : "No price"

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{desciption || "No description"}</p>
                <p className="single-comic__descr">Pages: {pageCount}</p>
                <p className="single-comic__descr"></p>
                <div className="single-comic__price">{displPrice}</div>
            </div>
            <a href={url} className="single-comic__back">Back to all</a>
        </>

    )
}

export default SingleComic;