import { Body1 } from 'gobble-lib-react';
import { ChatEvent } from './chat-event';
import styled from 'styled-components';
import { Platform } from '../../types/platform';

type ChatLineProps = {
    readonly event: ChatEvent
}

const LineWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
`;

const TwitchIcon = styled.i`
    color: #9146FF;
    font-size: 14px;
`;

const YouTubeIcon = styled.i`
    color: #ff0000;
    font-size: 14px;
`;

const NoWrap = styled(Body1)`
    white-space: nowrap;
`;


export const ChatEventLine = ({ event }: ChatLineProps) => {
    const data = event.data;

    return (
        <LineWrapper>
            <NoWrap>{new Date(data.timeStamp).toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' })}</NoWrap>
            {data.platform === Platform.TWITCH ? <TwitchIcon className='fab fa-twitch' /> : (data.platform === Platform.YOUTUBE ? <YouTubeIcon className='fab fa-youtube' /> : <div />)}
            <NoWrap>{data.subscriber} {data.tier}</NoWrap>
        </LineWrapper>
    );
};