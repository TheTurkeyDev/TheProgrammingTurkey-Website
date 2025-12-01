import { TextToast, useFetch, useQuery, useToast } from 'gobble-lib-react';
import { deleteParams, getParams, patchParams, postParams } from '../network/auth-network';
import { useEffect, useState } from 'react';

export function useRestObjectArray<T>(url: string, usePatch: boolean): readonly [readonly T[], (toSave: T) => void, (toSave?: T, pathParams?: string) => void, (pathParams?: string) => void, boolean] {
    const { pushToast } = useToast();

    const [restData, loading, { refetch }] = useFetch<readonly T[]>(url, { requestData: getParams });
    const [addEntry] = useQuery<T>(url, { requestData: postParams, shouldThrow: true });
    const [saveEntry] = useQuery(url, { requestData: usePatch ? patchParams : postParams, shouldThrow: true });
    const [deleteEntry] = useQuery(url, { requestData: deleteParams, shouldThrow: true });

    const [data, setData] = useState<readonly T[]>([]);

    useEffect(() => {
        setData(restData ?? []);
    }, [restData]);


    const doAdd = (toSave: T) => {
        addEntry(JSON.stringify(toSave))
            .then(resp => resp && setData([...data, resp]))
            .catch(e => pushToast(<TextToast text={e.message ?? 'An error has occured!'} />));;
    };

    const doSave = (toSave?: T, pathParams?: string) => {
        saveEntry(toSave !== undefined ? JSON.stringify(toSave) : undefined, pathParams)
            .then(() => {
                refetch();
            })
            .catch(e => pushToast(<TextToast text={e.message ?? 'An error has occured!'} />));;
    };

    const doDelete = (pathParams?: string) => {
        deleteEntry(undefined, pathParams)
            .then(() => {
                refetch();
            })
            .catch(e => pushToast(<TextToast text={e.message ?? 'An error has occured!'} />));
    };

    return [data, doAdd, doSave, doDelete, loading];
};