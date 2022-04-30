import { getGetAuthParams } from '../../network/auth-network';
import { getDevAPIBase } from '../../network/network-helper';
import { Suggestion } from './suggestion';
import { SuggestionBox } from './suggestion-box';

export async function getManagedSuggestionBoxes(): Promise<readonly SuggestionBox[]> {
    return await fetch(`${getDevAPIBase()}/suggestions/managed`, getGetAuthParams()).then(resp => {
        if (resp.ok)
            return resp.json();
        return [];
    });
}

export async function getSuggestionBox(id: string): Promise<SuggestionBox> {
    return await fetch(`${getDevAPIBase()}/suggestions/box?id=${id}`, getGetAuthParams()).then(resp => {
        if (resp.ok)
            return resp.json();
        return [];
    });
}

export async function getSuggestions(id: string, page: number, count: number): Promise<readonly Suggestion[]> {
    return await fetch(`${getDevAPIBase()}/suggestions/box/suggestions?box=${id}&page=${page}&count=${count}`, getGetAuthParams()).then(resp => {
        if (resp.ok)
            return resp.json();
        return [];
    });
}