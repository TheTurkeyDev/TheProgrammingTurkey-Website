import { getDevAPIBase } from './network-helper';

export function getGetParams() {
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    };
}

export async function getModStatus() {
    return await fetch(`${getDevAPIBase()}/modstatus`, getGetParams()).then(resp => {
        return resp.json()
    });
}

export async function getChanceCubeUserList() {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlist`, getGetParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return [];
    })
}

export async function getProjects(group) {
    console.log(group);
    return await fetch(`${getDevAPIBase()}/projects${!group ? '' : `?group=${group}`}`, getGetParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return {};
    })
}
