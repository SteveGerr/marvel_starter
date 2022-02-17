import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';
import Skeleton from '../components/skeleton/Skeleton';


// В зависимости от процесса, будем рендерить char
/**
 * Функция управляющая состоянием загрузки компоненета
 * @param {String} process - Статус загрузки компонента
 * @param {Function} Component - Компонент, который рендерится
 * @param {*} data - данные компонента
 * @returns  Component
 */
const setContent = (process, Component, data ) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected proccess state')
    }

}


export default setContent