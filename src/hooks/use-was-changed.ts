import { usePrevious } from 'gobble-lib-react';

export const useWasChanged = (val: unknown) => {
    const prevVal = usePrevious(val);
    return prevVal !== val;
};