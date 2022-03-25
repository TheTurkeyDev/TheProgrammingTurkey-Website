import { getDevAPIBase } from './network-helper';
import { getGetParams } from './network';
import { PlatformLoginType } from '../types/platform-login';
import { UserAndPlatform } from '../types/user-and-platform';
import { Persmission } from '../types/permission';
import { ProcessHealth } from '../types/process-health';
import { UserConnection } from '../types/user-connection';
import { YouTubeDisplaySettings } from '../pages/projects/stream-tools/yt-sub-count/youtube-display-settings';
import { RestResponseWrapper } from '../types/rest-response-wrapper';

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

export async function getLogins(returnurl: string): Promise<readonly PlatformLoginType[]> {
    return await fetch(`${getDevAPIBase()}/auth/platformlogins?returnurl=${returnurl}`, getGetParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getPlatformLinks(returnurl: string): Promise<readonly PlatformLoginType[]> {
    return await fetch(`${getDevAPIBase()}/auth/platformlinks?returnurl=${returnurl}`, getGetParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function loginWithPlatform(platform: string, code: string, action: string) {
    return await fetch(`${getDevAPIBase()}/auth/${platform}/token?code=${code}&action=${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return { success: false, message: 'something dun broke' };
    });
}

export async function logout() {
    return await fetch(getDevAPIBase() + '/auth/logout', getPostAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function isLoggedIn() {
    return await fetch(getDevAPIBase() + '/auth/loggedin', getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function confirmMerge(platform: string) {
    return await fetch(getDevAPIBase() + '/auth/confirmmerge', getPostAuthParams({ platform: platform })).then(resp => {
        return resp.json();
    });
}

export async function getUserPerms() {
    return await fetch(getDevAPIBase() + '/user/perms', getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getUserInfo() {
    return await fetch(getDevAPIBase() + '/user/info', getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUserConnectedAccounts(): Promise<readonly UserConnection[]> {
    return await fetch(getDevAPIBase() + '/user/connectedaccounts', getGetAuthParams()).then(resp => {
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

export async function getUserAdmin(userId: string) {
    return await fetch(`${getDevAPIBase()}/admin/getuser`, getPostAuthParams({
        user_id: userId
    })).then(resp => {
        return resp.json();
    });
}

export async function getAllUsers(usernameFilter: string, platforms: readonly string[]): Promise<readonly UserAndPlatform[]> {
    return await fetch(`${getDevAPIBase()}/admin/getusers`, getPostAuthParams({
        name_filter: usernameFilter,
        platforms
    })).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getAllPermissions(filter: string): Promise<readonly Persmission[]> {
    return await fetch(`${getDevAPIBase()}/admin/getpermissions`, getPostAuthParams({
        filter
    })).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function giveUserPermission(userId: string, permission: string) {
    return await fetch(`${getDevAPIBase()}/admin/giveuserpermission`, getPostAuthParams({
        user_id: userId,
        permission: permission
    })).then(resp => {
        return resp.json();
    });
}

export async function removeUserPermission(userId: string, permission: string) {
    return await fetch(`${getDevAPIBase()}/admin/removeuserpermission`, getPostAuthParams({
        user_id: userId,
        permission: permission
    })).then(resp => {
        return resp.json();
    });
}

export async function createPermission(permissionId: string, description: string) {
    return await fetch(`${getDevAPIBase()}/admin/createpermissions`, getPostAuthParams({
        permission_id: permissionId,
        description: description
    })).then(resp => {
        return resp.json();
    });
}

export async function deletePermission(permission: string) {
    return await fetch(`${getDevAPIBase()}/admin/deletepermission`, getPostAuthParams({
        permission_id: permission
    })).then(resp => {
        return resp.json();
    });
}

export async function setProjectStatus(project: string, version: string, status: string) {
    return await fetch(`${getDevAPIBase()}/admin/setprojectstatus`, getPostAuthParams({
        project: project,
        version: version,
        status: status
    })).then(resp => resp.json());
}

export async function getAllProcessHealth(): Promise<readonly ProcessHealth[]> {
    return await fetch(`${getDevAPIBase()}/admin/processhealth`, getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function startStopProcess(process: ProcessHealth) {
    return await fetch(`${getDevAPIBase()}/admin/${process.state === 'RUNNING' ? 'stop' : 'start'}process`, getPostAuthParams({
        process_id: process.process_id
    })).then(resp => {
        return resp.json();
    });
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

export async function getYTSubsDisplaySettings(token: string): Promise<RestResponseWrapper<YouTubeDisplaySettings>> {
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
