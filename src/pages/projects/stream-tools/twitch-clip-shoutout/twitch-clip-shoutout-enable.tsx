import { Body1, ContainedButton, Headline3, useQuery } from 'gobble-lib-react';
import styled from 'styled-components';
import { getDevAPIBase } from '../../../../network/network-helper';
import { getPostAuthParams } from '../../../../network/auth-network';

const CenterBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`;

type TwitchClipShoutoutEnableProps = {
    readonly reload: () => void
}

export const TwitchClipShoutoutEnable = ({ reload }: TwitchClipShoutoutEnableProps) => {

    const [enableApp] = useQuery(`${getDevAPIBase()}/twitchclipshoutout/enable`, { requestData: getPostAuthParams(), shouldThrow: true });

    const onEnableClick = () => {
        enableApp().then(reload);
    };

    return (
        <CenterBody>
            <Headline3>Twitch Clip Shoutout</Headline3>
            <Body1>Would you like to enable this app?</Body1>
            <ContainedButton onClick={onEnableClick}>Enable</ContainedButton>
        </CenterBody>
    );
};