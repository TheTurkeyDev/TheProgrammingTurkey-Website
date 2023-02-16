import { ModStatus } from '../types/mod-status';
import { getParams } from './auth-network';
import { getDevAPIBase } from './network-helper';


export async function getModStatus(): Promise<readonly ModStatus[]> {
    return await fetch(`${getDevAPIBase()}/modstatus`, getParams).then(resp => {
        return resp.json();
    });
}