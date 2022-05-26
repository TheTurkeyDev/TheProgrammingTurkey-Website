import { ModStatus } from '../types/mod-status';
import { getDevAPIBase } from './network-helper';

export function getGetParams(): RequestInit {
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    };
}

export async function getModStatus(): Promise<readonly ModStatus[]> {
    return await fetch(`${getDevAPIBase()}/modstatus`, getGetParams()).then(resp => {
        return resp.json();
    });
}