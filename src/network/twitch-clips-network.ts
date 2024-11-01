import { RestResponseWrapper } from '../types/rest-response-wrapper';
import { TwitchClip } from '../types/twitch-clip-filter/twitch-clip';
import { TwitchClipTag } from '../types/twitch-clip-filter/twitch-clip-tag';
import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getClips(channel: number, page: number, amount: number, allowedTags: readonly number[], disallowedTags: readonly number[]): Promise<readonly TwitchClip[]> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/channels/${channel}/clips?page=${page}&amount=${amount}&allowedTags=${allowedTags.join(',')}&disallowedTags=${disallowedTags.join(',')}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getNextClip(channel: number, untagged: boolean, allowedTags: readonly number[], disallowedTags: readonly number[], prevId: string) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/channels/${channel}/nextclip?untagged=${untagged}&allowedTags=${allowedTags.join(',')}&disallowedTags=${disallowedTags.join(',')}&prev=${prevId}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function getTags(channelId: number): Promise<readonly TwitchClipTag[]> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/channels/${channelId}/tags`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function addTagsToClip(clipId: string, tags: readonly number[]) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/clips/${clipId}/tags`, authAPI.getPostAuthParams(tags)).then(resp => {
        if (resp.ok)
            return resp.json();
        else
            return [];
    });
}

export async function removeTagFromClip(clipId: string, tag: number) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/clips/${clipId}/tags/${tag}`, authAPI.deleteParams).then(resp => {
        return resp.ok;
    });
}

export async function getClipTags(clipId: string): Promise<readonly number[]> {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/clips/${clipId}/tags`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function editTag(tag: TwitchClipTag) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/channels/${tag.channel_id}/tags/${tag.id}`, authAPI.getPatchAuthParams(tag)).then(resp => {
        return resp.json();
    });
}

export async function addTag(tag: TwitchClipTag) {
    return await fetch(`${getDevAPIBase()}/twitchclipfilter/channels/${tag.channel_id}/tags`, authAPI.getPostAuthParams(tag)).then(resp => {
        return resp.json();
    });
}

