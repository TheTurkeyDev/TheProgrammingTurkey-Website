import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function pullTwitchClips(channel) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/loadClips?channel=${channel}`, authAPI.getPostAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getClips(channel, page, amount, allowedTags, disallowedTags) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getclips?channel=${channel}&page=${page}&amount=${amount}&allowedTags=${allowedTags.join(',')}&disallowedTags=${disallowedTags.join(',')}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getNextClip(channel, untagged, allowedTags, disallowedTags, prevId) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/nextclip?channel=${channel}&untagged=${untagged}&allowedTags=${allowedTags.join(',')}&disallowedTags=${disallowedTags.join(',')}&prev=${prevId}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUntaggedClips(channel) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getuntaged?channel=${channel}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getTags(channelId) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/gettags?channelId=${channelId}`, authAPI.getGetAuthParams()).then(resp => {
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

export async function getManagingChannels() {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/managingchannels`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function editTag(tag) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/edittag`, authAPI.getPostAuthParams(tag)).then(resp => {
        return resp.json();
    });
}

export async function addTag(tag) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/addtag`, authAPI.getPostAuthParams(tag)).then(resp => {
        return resp.json();
    });
}

