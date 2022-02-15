import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import SinglePage from '../pages/SinglePage';
import SingleCharPage from '../pages/singleCharPage/SingleCharPage';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/comics' element={<ComicsPage />} />
                            <Route path='/comics/:comicId' element={<SinglePage Component={SingleComicPage} dataType='comic' />} />
                            <Route path='/characters/:id' element={<SinglePage Component={SingleCharPage} dataType='character' />} />
                            <Route path='*' element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;