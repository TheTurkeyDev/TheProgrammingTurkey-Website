import { useEffect, useState } from 'react';
import { getGetAuthParams } from '../network/auth-network';
import { getDevAPIBase } from '../network/network-helper';

type AdditionalOptions<T> = {
    readonly requestData?: RequestInit
    readonly skip?: boolean
    readonly onComplete?: (data: T) => void
    readonly onError?: (message: String) => void
}
export function useFetch<T>(url: string, options?: AdditionalOptions<T>) {
    const [fetching, setFetching] = useState(false);
    const [responseData, setResponseData] = useState<T>();
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();

    const resetData = () => {
        setData(responseData);
    };

    useEffect(() => {
        if (options?.skip)
            return;

        setFetching(true);
        fetch(`${getDevAPIBase()}${url}`, options?.requestData ?? getGetAuthParams())
            .then(r => r.json().then(data => ({ status: r.status, body: data })).catch(e => ({ status: r.status, body: null })))
            .then(({ status, body }) => {
                if (status === 200) {
                    options?.onComplete && options?.onComplete(body as T);
                    setData(body as T);
                    setResponseData(body as T);
                }
                else {
                    options?.onError && options?.onError(body.message);
                    setError(body.message);
                }

                setFetching(false);
            }).catch(e => {
                console.log(e);
                setError('An error has occured!');
                setFetching(false);
            });
    }, [options?.skip]);

    return { fetching, data, error, setData, resetData };
};