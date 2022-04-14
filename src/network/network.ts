import { CCContentCreator } from '../types/chance-cubes/chance-cubes-content-creator';
import { LDEvent } from '../types/ld-event';
import { ModStatus } from '../types/mod-status';
import { ProjectGroup } from '../types/project.group';
import { RestResponseWrapper } from '../types/rest-response-wrapper';
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

export async function getChanceCubeUserList(): Promise<readonly CCContentCreator[]> {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlist`, getGetParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getProjects(group: string | null): Promise<RestResponseWrapper<{ readonly [key: string]: ProjectGroup }>> {
    return await fetch(`${getDevAPIBase()}/projects${!group ? '' : `?group=${group}`}`, getGetParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return { success: false, data: {} };
    });
}

export async function getLudumDareStats(): Promise<RestResponseWrapper<readonly LDEvent[]>> {
    return await fetch(`${getDevAPIBase()}/ludumdare/stats`, getGetParams()).then(resp => {
        return resp.json();
    });
}