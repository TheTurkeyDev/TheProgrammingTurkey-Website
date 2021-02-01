import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function pullTwitchClips(channel) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/loadClips?channel=${channel}`, authAPI.getPostAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUntaggedClips(channel) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getuntaged?channel=${channel}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getTags() {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/gettags`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function addTagsToClip(clip_id, tags) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/addcliptag`, authAPI.getPostAuthParams({ clip_id, tags })).then(resp => {
        return resp.json();
    });
}

export async function removeTagFromClip(clip_id, tags) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/removecliptag`, authAPI.getPostAuthParams({ clip_id, tags })).then(resp => {
        return resp.json();
    });
}

export async function getClipTags(clipId) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getcliptags?clipId=${clipId}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}