import { useState, useCallback } from 'react';
/** Универсальный хук для загрузки данных */
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /**
     * @param {String} url - адрес запроса
     * @param {String} method - Метод запроса
     * @param {String} body - тело запроса
     * @param {Object} headers - заголовки запроса
     */
    /** Запрос на сервер
     *  useCallback - позволяет сделать запрос только один раз, при монтировании
     */
    const request = useCallback(async (url, method='GET', body = null, headers = {'Content-type': 'application/json'}) => {
        setLoading(true)

        try {
            const response = await fetch(url, {method, body, headers})

            /** If responce down */
            if (!response.ok) {
                /** Show error */
                throw new Error(`Could not fetch ${url}, status ${response.status}`)
            }

            const data = await response.json()

            setLoading(false)

            return data

        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
        }

    }, [])


    const clearError = useCallback(() => setError(null))

    return {loading, request, error, clearError}
}