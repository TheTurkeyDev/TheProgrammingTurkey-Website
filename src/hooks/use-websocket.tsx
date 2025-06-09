/* eslint-disable functional/immutable-data */
import { useInterval } from 'gobble-lib-react';
import { useEffect, useRef } from 'react';
import ReconnectingWebSocket, { Event } from 'reconnecting-websocket';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWebSocket = (url: string, onMessage: ((event: MessageEvent<any>) => void) | null = null, onOpen: ((event: Event, socket?: ReconnectingWebSocket) => void) | null = null) => {
    const socket = useRef<ReconnectingWebSocket>(undefined);

    useEffect(() => {
        socket.current = new ReconnectingWebSocket(url);

        socket.current.onopen = event => onOpen && onOpen(event, socket.current);

        socket.current.onclose = event => {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        };

        socket.current.onerror = error => {
            console.log(`[error] ${error.message}`);
        };

        socket.current.onmessage = onMessage;
    }, []);

    useInterval(() => {
        sendMessage(JSON.stringify({ 'action': 'ping' }));
    }, 60000);

    const sendMessage = (message: string) => {
        socket.current?.send(message);
    };

    return { sendMessage };
};