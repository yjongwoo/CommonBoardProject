import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:8080';

const useAxios = (url, method) => {
    const [response, setResponse] = useState(null)
    const fetchData = () => {
        axios[method](url)
            .then(({data}) => setResponse(data))
    }
    useEffect(() => {
        fetchData()
    }, [url])
    return {response , error: null}
}

export default useAxios;