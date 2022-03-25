import { usePrevious } from '@theturkeydev/gobble-lib-react';

export const useWasChanged = (val: unknown) => {
    const prevVal = usePrevious(val);
    return prevVal !== val;
};