import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ChatMergeMaker } from './chat-merge-maker';

const Wrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
`;

const getUrlForPlatform = (platform: string, value: string) => {
    switch (platform.toLowerCase()) {
        case 'twitch':
            return `https://www.twitch.tv/embed/${value}/chat?parent=theturkey.dev&parent=localhost`;
        case 'youtube':
            return `https://www.youtube.com/live_chat?v=${value}&embed_domain=localhost`;
        case 'x':
            return `https://x.com/${value}/chat`;
        default:
            return undefined;
    }
};

export const ChatMerge = () => {

    const [searchParams] = useSearchParams();

    if (searchParams.size === 0)
        return <ChatMergeMaker />;

    return (
        <Wrapper>
            {
                [...searchParams.entries()].map(([p, v]) => {

                    const url = getUrlForPlatform(p, v);

                    if (!url)
                        return <div key={p} />;

                    return (<iframe key={p} src={url} height='100%' width='100%' />);
                })
            }
        </Wrapper>
    );
};