import { usePrevious } from './use-previous'

export const useWasChanged = (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
}