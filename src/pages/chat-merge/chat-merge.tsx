import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatMessage } from './chat-message';
import { ChatLine } from './chat-line';
import { useWebSocket } from '../../hooks/use-websocket';
import { getDevAPIBase, getSocketURLBase } from '../../network/network-helper';
import { Loading, useFetch } from 'gobble-lib-react';
import { getParams } from '../../network/auth-network';
import { useWakeLock } from 'react-screen-wake-lock';
import { ChatEvent } from './chat-event';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin: 8px;
`;

const Chat = styled.div`
    height: 100%;
    overflow-y: auto;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

type ChatLine = ChatEvent | ChatMessageWrapper

type ChatMessageWrapper = {
    readonly type: string,
    readonly data: ChatMessage
}

export const ChatMerge = () => {
    useWakeLock({ reacquireOnPageVisible: true });

    const [token, loading] = useFetch<{ readonly token: string }>(`${getDevAPIBase()}/chat-merge/token`, { requestData: getParams });

    const { sendMessage } = useWebSocket(getSocketURLBase(), e => {
        const msg = JSON.parse(e.data);
        processMessage(msg);
    });

    const [_, setMessages] = useState<readonly ChatMessage[]>([]);
    const [__, setEvents] = useState<readonly ChatEvent[]>([]);
    const [chatLines, setChatLines] = useState<readonly ChatLine[]>([]);

    useEffect(() => {
        if (!token)
            return;

        sendMessage(JSON.stringify({
            action: 'connect',
            service: 'chat_merge',
            token: token.token,
        }));

    }, [token]);

    const getEventDate = (data: ChatLine) => {
        switch (data.type) {
            case 'message':
                return new Date((data as ChatMessageWrapper).data.timeStamp);
            case 'sub':
            case 'giftSub':
                return new Date((data as ChatEvent).data.timeStamp);
            default:
                return new Date();
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processMessage = (msg: any) => {
        if (msg.action === 'init') {
            setMessages(msg.messages);
            setEvents(msg.events);
            setChatLines(() => [
                ...(msg.messages as readonly ChatMessage[])
                    .map(cm => { return ({ type: 'message', data: cm } as ChatMessageWrapper); }),
                ...(msg.events as readonly ChatEvent[])
            ].sort((a, b) => getEventDate(a).getTime() - getEventDate(b).getTime()));
        }
        if (msg.action === 'message') {
            setMessages(old => [...old, msg.data]);
            setChatLines(old => [...old, msg.data]);
        }
        if (msg.action === 'event') {
            setEvents(old => [...old, msg.data]);
            setChatLines(old => [...old, msg.data]);
        }
    };

    if (loading)
        return <Loading />;

    return (
        <Wrapper>
            <Chat>
                {
                    chatLines.map((m, i) => m.type === 'message' ? <ChatLine key={i} message={m.data as ChatMessage} /> : <div key={i} />)
                }
            </Chat>
        </Wrapper>
    );
}; 