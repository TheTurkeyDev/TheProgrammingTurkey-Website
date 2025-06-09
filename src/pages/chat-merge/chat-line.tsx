import { Body1 } from 'gobble-lib-react';
import { ChatMessage } from './chat-message';
import styled from 'styled-components';
import { Platform } from '../../types/platform';

type ChatLineProps = {
    readonly message: ChatMessage
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

const Message = styled(Body1)`
    border-left: 2px solid white;
    padding-left: 8px;
`;

export const ChatLine = ({ message }: ChatLineProps) => {
    return (
        <LineWrapper>
            <NoWrap>{new Date(message.timeStamp).toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' })}</NoWrap>
            {message.platform === Platform.TWITCH ? <TwitchIcon className='fab fa-twitch' /> : (message.platform === Platform.YOUTUBE ? <YouTubeIcon className='fab fa-youtube' /> : <div />)}
            <NoWrap style={{ color: message.senderColor ? `#${message.senderColor}` : '' }}>{message.sender}</NoWrap>
            <Message>{message.message}</Message>
        </LineWrapper>
    );
};