import { getDevAPIBase } from './network-helper';
import { Permission } from '../types/permission';
import { YouTubeDisplaySettings } from '../pages/projects/stream-tools/yt-sub-count/youtube-display-settings';

const baseParams: RequestInit = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
    }
};

const paramsForType = (method: string) => ({ method, ...baseParams });
export const getParams: RequestInit = paramsForType('GET');
export const postParams: RequestInit = paramsForType('POST');
export const deleteParams: RequestInit = paramsForType('DELETE');
export const patchParams: RequestInit = paramsForType('PATCH');
export const putParams: RequestInit = paramsForType('PUT');

export function getGetAuthParams(): RequestInit {
    return {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPostAuthParams(body?: any): RequestInit {
    return {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(body)
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPatchAuthParams(body?: any): RequestInit {
    return {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(body)
    };
}


export async function confirmMerge(platform: string) {
    return await fetch(getDevAPIBase() + '/auth/confirmmerge', getPostAuthParams({ platform: platform })).then(resp => {
        return resp.json();
    });
}

export async function getUserProfileApps(adminApps: boolean) {
    return await fetch(`${getDevAPIBase()}/user/profileapps?adminApps=${adminApps}`, getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getAllPermissions(filter: string): Promise<readonly Permission[]> {
    return await fetch(`${getDevAPIBase()}/admin/permissions?filter=${filter}`, getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function giveUserPermission(userId: string, permission: string) {
    return await fetch(`${getDevAPIBase()}/admin/users/${userId}/permissions/${permission}`, getPostAuthParams({
        user_id: userId,
        permission: permission
    })).then(resp => {
        return resp.json();
    });
}

export async function removeUserPermission(userId: string, permission: string) {
    return await fetch(`${getDevAPIBase()}/admin/users/${userId}/permissions/${permission}`, deleteParams).then(resp => {
        return resp.json();
    });
}

export async function createPermission(permissionId: string, description: string) {
    return await fetch(`${getDevAPIBase()}/admin/permissions`, getPostAuthParams({
        permission: permissionId,
        description: description
    })).then(resp => {
        return resp.json();
    });
}

export async function setProjectStatus(project: string, version: string, status: string) {
    return await fetch(`${getDevAPIBase()}/admin/projectstatus`, getPostAuthParams({
        mod_name: project,
        version: version,
        status: status
    })).then(resp => resp.json());
}

export async function getToken(forId: string) {
    return await fetch(`${getDevAPIBase()}/proc/token?for_id=${forId}`, getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function regenToken(forId: string) {
    return await fetch(`${getDevAPIBase()}/proc/regentoken?for_id=${forId}`, getPostAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getYTSubs(token: string) {
    return await fetch(`${getDevAPIBase()}/proc/ytsubs?token=${token}`, getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getYTSubsDisplaySettings(token: string): Promise<YouTubeDisplaySettings> {
    return await fetch(`${getDevAPIBase()}/proc/ytsubsdisplaysettings?token=${token}`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function saveYTSubsDisplaySettings(token: string, ytsdsJson: YouTubeDisplaySettings) {
    return await fetch(`${getDevAPIBase()}/proc/saveytsubsdisplaysettings?token=${token}`, getPostAuthParams(ytsdsJson)).then(resp => {
        return resp.json();
    });
}


export async function connectAccount(platform: string) {
    return await fetch(`${getDevAPIBase()}/user/linkaccount?platform=${platform}`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}
