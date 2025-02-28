import { StreamAnimationUserData } from '../pages/projects/stream-tools/animation-overlay/mapped-stream-animation-user-data';
import { StreamAnimation } from '../types/stream-animations/stream-animation';
import { StreamAnimationSettingDef } from '../types/stream-animations/stream-animation-settings-def';
import { StreamAnimData } from '../types/stream-animations/user-data';
import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getAllAnimations(): Promise<readonly StreamAnimation[]> {
    return await fetch(`${getDevAPIBase()}/streamanimations`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function getUserData(): Promise<StreamAnimData> {
    return await fetch(`${getDevAPIBase()}/streamanimations/userdata`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return undefined;
    });
}

export async function saveUserData(userData: StreamAnimationUserData) {
    return await fetch(`${getDevAPIBase()}/streamanimations/userdata`, authAPI.getPostAuthParams({
        ...userData
    })).then(resp => {
        if (resp.status === 200)
            return true;
        return false;
    });
}

export async function removeUserAnimation(animationId: string) {
    return await fetch(`${getDevAPIBase()}/streamanimations/useranimation/${animationId}`, authAPI.deleteParams).then(resp => {
        if (resp.status === 200)
            return true;
        return false;
    }).catch(() => false);
}

export async function getSettingDef(anim: string): Promise<readonly StreamAnimationSettingDef[]> {
    return await fetch(`${getDevAPIBase()}/useranimation/${anim}/settings`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}

export async function testAnimation(anim: string) {
    return await fetch(`${getDevAPIBase()}/streamanimations/test/${anim}`, authAPI.getPostAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return {};
    });
}

export async function regenToken(forId: string) {
    return await fetch(`${getDevAPIBase()}/streamanimations/regentoken?for_id=${forId}`, authAPI.getPostAuthParams()).then(resp => {
        return resp.text();
    });
}