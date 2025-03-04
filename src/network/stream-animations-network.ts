import { StreamAnimationSettingDef } from '../types/stream-animations/stream-animation-settings-def';
import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';


export async function getSettingDef(anim: string): Promise<readonly StreamAnimationSettingDef[]> {
    return await fetch(`${getDevAPIBase()}/useranimation/${anim}/settings`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return [];
    });
}