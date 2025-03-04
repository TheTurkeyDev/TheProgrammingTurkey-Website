import { useFetch, useQuery } from 'gobble-lib-react';
import { getParams, patchParams, postParams } from '../network/auth-network';
import { useEffect, useState } from 'react';

export function useRestObject<T>(url: string, defaultVal: T | undefined, usePatch: boolean): readonly [T | undefined, (toSave?: T, pathParams?: string) => void, boolean] {
    const [restData, loading] = useFetch<T>(url, { requestData: getParams });
    const [saveData] = useQuery<T>(url, { requestData: usePatch ? patchParams : postParams, shouldThrow: true });

    const [data, setData] = useState<T>();

    useEffect(() => {
        setData(restData);
    }, [restData]);

    const save = (toSave?: T, pathParams?: string) => {
        saveData(toSave !== undefined ? JSON.stringify(toSave) : undefined, pathParams)
            .then(resp => resp && setData(resp));
    };

    return [data === undefined ? defaultVal : data, save, loading];
};