import { useState, useEffect } from 'react/cjs/react.development';
import { useParams, Link } from 'react-router-dom'
import useMarvelService from '../../Services/MarvelServices';
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../Spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'
import AppBanner from '../appBanner/AppBanner';
import './singleComicPage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState([]);
    const {comicId} = useParams()
    const {getComic, loading, error, clearError} = useMarvelService()

    useEffect(() => {
        onRequest()
    }, [comicId])

    const onRequest = () => {
        clearError()
        getComic(comicId)
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
        <>
            <AppBanner />
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const SingleComicView = ({comic}) => {
    const {thumbnail, title, desciption, pageCount, language, prices, url} = comic

    const displPrice = prices ? prices[0].price + "$" : "No price"

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{desciption || "No description"}</p>
                <p className="single-comic__descr">Pages: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{displPrice}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>

    )
}

export default SingleComicPage;