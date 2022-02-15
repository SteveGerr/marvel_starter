import {useState} from 'react';
import { Formik, useField, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../Services/MarvelServices';
import ErrorMessage from '../errorMessage/errorMessage';

import './CharSearch.scss';

const SearchInput = ({label, ...props}) => {
    const [meta, field] = useField(props)

    return (
        <>
            <label>{label}</label>
            <input {...field} {...props}/>
        </>
    )
}

const CharSearch = () => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError()

        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (

        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({charName}) => {
                    updateChar(charName)
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                    <Field
                            id="charName"
                            name='charName'
                            type='text'
                            placeholder="Enter name"/>
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearch