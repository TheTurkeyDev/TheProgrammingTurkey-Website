import { getDevAPIBase } from './network-helper';

function getGetParams() {
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
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