import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getTimers() {
    return await fetch(`${getDevAPIBase()}/streamtimer/timers`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return [];
    });
}

export async function getTimer(userId, timerId) {
    return await fetch(`${getDevAPIBase()}/streamtimer/timer/${userId}/${timerId}`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return null;
    });
}

export async function startTimer(timerId) {
    return await fetch(`${getDevAPIBase()}/streamtimer/start`, authAPI.getPostAuthParams({
        timer_id: timerId,
    })).then(resp => {
        return resp.json();
    });
}

export async function saveTimer(timerJson) {
    return await fetch(`${getDevAPIBase()}/streamtimer/save`, authAPI.getPostAuthParams(timerJson)).then(resp => {
        return resp.json();
    });
}

export async function newTimer() {
    return await fetch(`${getDevAPIBase()}/streamtimer/newtimer`, authAPI.getPostAuthParams()).then(resp => {
        return resp.json();
    });
}