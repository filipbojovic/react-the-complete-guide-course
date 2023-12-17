import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data); // 010 - 05:50 how it works with createTask.bind() of NewTask.js

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);
    // }, [applyData]); // 009 - 05:00

    return {
        isLoading,
        error,
        sendRequest
        // the code below is the same as the one above which is just a modern JS approach when both key and values have the same name.
        // isLoading: isLoading,
        // error: error,
        // sendRequest: sendRequest
    }
};

export default useHttp;