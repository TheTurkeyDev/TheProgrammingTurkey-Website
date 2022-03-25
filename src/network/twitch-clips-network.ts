import { RestResponseWrapper } from '../types/rest-response-wrapper';
import { ManagingChannel } from '../types/twitch-clip-filter/managing-channel';
import { TwitchClip } from '../types/twitch-clip-filter/twitch-clip';
import { TwitchClipTag } from '../types/twitch-clip-filter/twitch-clip-tag';
import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function pullTwitchClips(channel: number) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/loadClips?channel=${channel}`, authAPI.getPostAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getClips(channel: number, page: number, amount: number, allowedTags: readonly number[], disallowedTags: readonly number[]): Promise<RestResponseWrapper<readonly TwitchClip[]>> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getclips?channel=${channel}&page=${page}&amount=${amount}&allowedTags=${allowedTags.join(',')}&disallowedTags=${disallowedTags.join(',')}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getNextClip(channel: number, untagged: boolean, allowedTags: readonly number[], disallowedTags: readonly number[], prevId: string) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/nextclip?channel=${channel}&untagged=${untagged}&allowedTags=${allowedTags.join(',')}&disallowedTags=${disallowedTags.join(',')}&prev=${prevId}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getUntaggedClips(channel: number) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getuntaged?channel=${channel}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getTags(channelId: number): Promise<RestResponseWrapper<readonly TwitchClipTag[]>> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/gettags?channelId=${channelId}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function addTagsToClip(clip_id: string, tags: readonly number[]) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/addcliptag`, authAPI.getPostAuthParams({ clip_id, tags })).then(resp => {
        return resp.json();
    });
}

export async function removeTagFromClip(clip_id: string, tags: readonly number[]) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/removecliptag`, authAPI.getPostAuthParams({ clip_id, tags })).then(resp => {
        return resp.json();
    });
}

export async function getClipTags(clipId: string): Promise<RestResponseWrapper<readonly number[]>> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/getcliptags?clipId=${clipId}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getManagingChannels(): Promise<RestResponseWrapper<readonly ManagingChannel[]>> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/managingchannels`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function editTag(tag: TwitchClipTag) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/edittag`, authAPI.getPostAuthParams(tag)).then(resp => {
        return resp.json();
    });
}

export async function addTag(tag: TwitchClipTag) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/addtag`, authAPI.getPostAuthParams(tag)).then(resp => {
        return resp.json();
    });
}

