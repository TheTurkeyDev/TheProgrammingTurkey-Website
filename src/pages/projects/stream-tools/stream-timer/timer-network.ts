import { getGetAuthParams, getPostAuthParams } from '../../../../network/auth-network';
import { getDevAPIBase } from '../../../../network/network-helper';
import { TimerData } from './timer-data';


export async function getTimer(userId: string, timerId: number): Promise<TimerData> {
    return await fetch(`${getDevAPIBase()}/streamtimer/timer/${userId}/${timerId}`, getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function startTimer(timerId: number) {
    return await fetch(`${getDevAPIBase()}/streamtimer/start`, getPostAuthParams({
        timer_id: timerId,
    })).then(resp => {
        return resp.json();
    });
}

export async function saveTimer(timerJson: TimerData) {
    return await fetch(`${getDevAPIBase()}/streamtimer/save`, getPostAuthParams(timerJson)).then(resp => {
        return resp.json();
    });
}

export async function newTimer() {
    return await fetch(`${getDevAPIBase()}/streamtimer/newtimer`, getPostAuthParams()).then(resp => {
        return resp.json();
    });
}