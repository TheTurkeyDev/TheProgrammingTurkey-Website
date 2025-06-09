import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatMessage } from './chat-message';
import { ChatLine } from './chat-line';
import { useWebSocket } from '../../hooks/use-websocket';
import { getDevAPIBase, getSocketURLBase } from '../../network/network-helper';
import { Loading, useFetch } from 'gobble-lib-react';
import { getParams } from '../../network/auth-network';

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

export const ChatMerge = () => {
    const [chatMessages, setMessages] = useState<readonly ChatMessage[]>([]);

    const [token, loading] = useFetch<{ readonly token: string }>(`${getDevAPIBase()}/chat-merge/token`, { requestData: getParams });

    const { sendMessage } = useWebSocket(getSocketURLBase(), e => {
        const msg = JSON.parse(e.data);
        processMessage(msg);
    });

    useEffect(() => {
        if (!token)
            return;

        sendMessage(JSON.stringify({
            action: 'connect',
            service: 'chat_merge',
            token: token.token,
        }));

    }, [token]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processMessage = (msg: any) => {
        if (msg.action === 'init')
            setMessages(msg.messages);
        if (msg.action === 'message')
            setMessages(old => [...old, msg.data as ChatMessage]);
    };

    if (loading)
        return <Loading />;

    return (
        <Wrapper>
            <Chat>
                {
                    chatMessages.map(m => <ChatLine message={m} />)
                }
            </Chat>
        </Wrapper>
    );
}; 