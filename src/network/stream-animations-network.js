import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getAllAnimations() {
    return await fetch(`${getDevAPIBase()}/streamanimations/listanimations`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return [];
    });
}

export async function getUserData() {
    return await fetch(`${getDevAPIBase()}/streamanimations/userdata`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return {};
    });
}

export async function saveUserData(userData) {
    return await fetch(`${getDevAPIBase()}/streamanimations/userdata`, authAPI.getPostAuthParams({
        ...userData
    })).then(resp => {
        if (resp.status == 200)
            return true;
        return false;
    });
}

export async function removeUserAnimation(animationId) {
    return await fetch(`${getDevAPIBase()}/streamanimations/removeuseranimation`, authAPI.getPostAuthParams({
        animation_id: animationId
    })).then(resp => {
        if (resp.status == 200)
            return true;
        return false;
    }).catch(() => false);
}

export async function getSettingDef(anim) {
    return await fetch(`${getDevAPIBase()}/streamanimations/settingdef?animation=${anim}`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return [];
    });
}

export async function regenToken(forId) {
    return await fetch(`${getDevAPIBase()}/streamanimations/regentoken?for_id=${forId}`, authAPI.getPostAuthParams()).then(resp => {
        return resp.text();
    });
}