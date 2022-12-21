import { useState } from 'react';

const baseParams: RequestInit = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
    }
};
const paramsForType = (method: string) => ({ method, ...baseParams });
export const getParams: RequestInit = paramsForType('GET');
export const postParams: RequestInit = paramsForType('POST');
export const deleteParams: RequestInit = paramsForType('DELETE');

type AdditionalOptions<T> = {
    readonly requestData?: RequestInit
    readonly shouldThrow?: boolean
}
export function useQuery<T>(url: string, options?: AdditionalOptions<T>) {
    const [querying, setQuerying] = useState(false);
    const [error, setError] = useState<string>();

    const query = async (body?: string, pathParams?: string, queryParams?: string) => {
        setQuerying(true);
        const reqData = options?.requestData ?? getParams;
        reqData.body = body;
        return fetch(`${url}/${pathParams ?? ''}?${queryParams ?? ''}`, reqData)
            .then(r => r.json().then(data => ({ status: r.status, body: data })))
            .then(({ status, body }) => {
                setQuerying(false);
                if (status === 200) {
                    return body as T;
                }
                else {
                    // TODO throw
                    // options?.onError && options?.onError(body.message);
                    setError(body.message);
                    if (options?.shouldThrow) {
                        throw ({ status, message: body.message });
                    }
                }
                return null;
            }).catch(e => {
                setQuerying(false);
                throw e;
            });
    };

    return { query, querying, error };
};