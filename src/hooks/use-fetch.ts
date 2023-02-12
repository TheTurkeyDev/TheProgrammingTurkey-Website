import { useEffect, useState } from 'react';
import { getGetAuthParams } from '../network/auth-network';
import { getDevAPIBase } from '../network/network-helper';

type AdditionalOptions<T> = {
    readonly requestData?: RequestInit
    readonly skip?: boolean
    readonly onComplete?: (data: T) => void
    readonly onError?: (message: String) => void
}

type ExtraData<T> = {
    readonly error: string | undefined
    readonly setData: React.Dispatch<React.SetStateAction<T | undefined>>
    readonly resetData: () => void;
}

export function useFetch<T>(url: string, options?: AdditionalOptions<T>): readonly [T | undefined, boolean, ExtraData<T>] {
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

        const controller = new AbortController();

        const init = {
            signal: controller.signal,
            ...(options?.requestData ?? getGetAuthParams())
        };

        setFetching(true);
        fetch(`${getDevAPIBase()}${url}`, init)
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
                setError('An error has occurred!');
                setFetching(false);
            });

        return () => {
            controller.abort();
        };
    }, [options?.skip]);

    return [data, fetching, { error, setData, resetData }];
};