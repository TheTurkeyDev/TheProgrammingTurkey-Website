import { getGetAuthParams, getPostAuthParams } from '../../network/auth-network';
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

export async function getSuggestions(id: string, start: number, count: number): Promise<readonly Suggestion[]> {
    return await fetch(`${getDevAPIBase()}/suggestions/box/suggestions?box=${id}&start=${start}&count=${count}`, getGetAuthParams()).then(resp => {
        if (resp.ok)
            return resp.json();
        return [];
    });
}

export async function deleteSuggestion(id: number): Promise<boolean> {
    return await fetch(`${getDevAPIBase()}/suggestions/box/suggestion/${id}/delete`, getPostAuthParams()).then(resp => {
        return resp.ok;
    });
}

export async function restoreSuggestion(id: number): Promise<boolean> {
    return await fetch(`${getDevAPIBase()}/suggestions/box/suggestion/${id}/restore`, getPostAuthParams()).then(resp => {
        return resp.ok;
    });
}

export async function verifySuggestion(id: number): Promise<boolean> {
    return await fetch(`${getDevAPIBase()}/suggestions/box/suggestion/${id}/verify`, getPostAuthParams()).then(resp => {
        return resp.ok;
    });
}