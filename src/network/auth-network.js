import { getDevAPIBase } from './network-helper';

export function getGetAuthParams() {
    return {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function getPostAuthParams(body) {
    return {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };
}

export async function loginTwitch(code) {
    return await fetch(getDevAPIBase() + "/auth/twitch/token", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'code': code
        }
    }).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return {};
    });
}

export async function loginYoutube(code) {
    return await fetch(getDevAPIBase() + "/auth/youtube/token", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'code': code
        }
    }).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return {};
    });
}

export async function logout() {
    return await fetch(getDevAPIBase() + "/auth/logout", getPostAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function isLoggedIn() {
    return await fetch(getDevAPIBase() + "/auth/loggedin", getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUserPerms() {
    return await fetch(getDevAPIBase() + "/user/perms", getGetAuthParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return [];
    });
}

export async function getUserInfo() {
    return await fetch(getDevAPIBase() + "/user/info", getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUserConnectedAccounts() {
    return await fetch(getDevAPIBase() + "/user/connectedaccounts", getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUserAdmin(userId) {
    return await fetch(`${getDevAPIBase()}/admin/getuser`, getPostAuthParams({
        user_id: userId
    })).then(resp => {
        return resp.json();
    });
}

export async function getAllUsers(usernameFilter, platforms) {
    return await fetch(`${getDevAPIBase()}/admin/getusers`, getPostAuthParams({
        name_filter: usernameFilter,
        platforms: platforms
    })).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getAllPermissions(filter) {
    return await fetch(`${getDevAPIBase()}/admin/getpermissions`, getPostAuthParams({
        filter: filter
    })).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function giveUserPermission(userId, permission) {
    return await fetch(`${getDevAPIBase()}/admin/giveuserpermission`, getPostAuthParams({
        user_id: userId,
        permission: permission
    })).then(resp => {
        return resp.json();
    });
}

export async function removeUserPermission(userId, permission) {
    return await fetch(`${getDevAPIBase()}/admin/removeuserpermission`, getPostAuthParams({
        user_id: userId,
        permission: permission
    })).then(resp => {
        return resp.json();
    })
}

export async function createPermission(permissionId, description) {
    return await fetch(`${getDevAPIBase()}/admin/createpermissions`, getPostAuthParams({
        permission_id: permissionId,
        description: description
    })).then(resp => {
        return resp.json();
    });
}

export async function deletePermission(permission) {
    return await fetch(`${getDevAPIBase()}/admin/deletepermission`, getPostAuthParams({
        permission_id: permission
    })).then(resp => {
        return resp.json();
    })
}

export async function setProjectStatus(project, version, status) {
    return await fetch(`${getDevAPIBase()}/admin/setprojectstatus`, getPostAuthParams({
        project: project,
        version: version,
        status: status
    })).then(resp => resp.json());
}

export async function getAllProcessHealth() {
    return await fetch(`${getDevAPIBase()}/admin/processhealth`, getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function startStopProcess(stop) {
    return await fetch(`${getDevAPIBase()}/admin/${stop ? "stop" : "start"}process`, getPostAuthParams({
        process_id: process.process_id
    })).then(resp => {
        return resp.json();
    });
}

export async function getToken(forId) {
    return await fetch(`${getDevAPIBase()}/proc/token?for_id=${forId}`, getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function regenToken(forId) {
    return await fetch(`${getDevAPIBase()}/proc/regentoken?for_id=${forId}`, getPostAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getYTSubs(token) {
    return await fetch(`${getDevAPIBase()}/proc/ytsubs?token=${token}`, getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getYTSubsDisplaySettings(token) {
    return await fetch(`${getDevAPIBase()}/proc/ytsubsdisplaysettings?token=${token}`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function saveYTSubsDisplaySettings(token, ytsdsJson) {
    console.log(ytsdsJson);
    return await fetch(`${getDevAPIBase()}/proc/saveytsubsdisplaysettings?token=${token}`, getPostAuthParams(ytsdsJson)).then(resp => {
        return resp.json();
    });
}


export async function connectAccount(platform) {
    return await fetch(`${getDevAPIBase()}/user/linkaccount?platform=${platform}`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function pullTwitchClips(channel, startDate, endDate) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/loadClips?channel=${channel}&startDate=${startDate}&endDate=${endDate}`, getPostAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUntaggedClips(channel, startDate, endDate) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getuntaged?channel=${channel}&startDate=${startDate}&endDate=${endDate}`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getTags() {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/gettags`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function addTagsToClip(clip_id, tags) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/tagclip`, getPostAuthParams({ clip_id, tags })).then(resp => {
        return resp.json();
    });
}
