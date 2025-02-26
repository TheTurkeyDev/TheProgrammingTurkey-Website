import { Body1, ButtonRow, ContainedButton, Headline3, HorizontalRule, InputsWrapper, Loading, Option, OutlinedButton, Select, useFetch, useQuery } from 'gobble-lib-react';
import { getDevAPIBase, getTwitchOverlaySiteBase } from '../../../../network/network-helper';
import { getGetAuthParams, getPostAuthParams } from '../../../../network/auth-network';
import { TwitchClipShoutoutSettings } from './twitch-clip-shoutout-settings';
import { TwitchClipShoutoutEnable } from './twitch-clip-shoutout-enable';
import { styled } from 'styled-components';
import { SecretURL } from '../../../../components/secret-url';
import { TwitchChatRoleLevel } from './twitch-chat-role-level';

const CenterBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    max-width: 900px;
    padding: 0 16px;
    margin-inline: auto;
`;

export const TwitchClipShoutout = () => {
    const [settings, loading, { refetch, setData, isDirty, resetData }] = useFetch<TwitchClipShoutoutSettings>(`${getDevAPIBase()}/twitchclipshoutout`, { requestData: getGetAuthParams() });
    const [saveSettings] = useQuery<{ readonly token: string }>(`${getDevAPIBase()}/twitchclipshoutout`, { requestData: getPostAuthParams(), shouldThrow: true });
    const [regenToken] = useQuery<{ readonly token: string }>(`${getDevAPIBase()}/twitchclipshoutout/regentoken`, { requestData: getPostAuthParams() });

    if (loading || !settings)
        return <Loading />;

    if (!settings.hasTwitchAccount)
        return <Body1>You need a Twitch account to use this app!</Body1>;

    if (!settings.hasScopes)
        return <Body1>This app requires additional Twitch scopes... Contact Turkey</Body1>;

    if (!settings.enabled)
        return <TwitchClipShoutoutEnable reload={refetch} />;

    const onRegenClick = () => {
        regenToken().then(() => refetch());
    };

    const saveSettingsToDB = () => {
        saveSettings(JSON.stringify(settings)).then(refetch);
    };

    const appURL = `${getTwitchOverlaySiteBase()}/clip-shoutout/${settings.token}`;

    return (
        <CenterBody>
            <Headline3>Twitch Clip Shoutout</Headline3>
            <SecretURL url={appURL} regen={onRegenClick} />
            <HorizontalRule />
            <InputsWrapper>
                <Select label='Restrict To' value={settings.usageControl} onChange={e => setData({ ...settings, usageControl: parseInt(e.target.value) })}>
                    <Option value={TwitchChatRoleLevel.STREAMER}>Streamer</Option>
                    <Option value={TwitchChatRoleLevel.EVERYONE}>Everyone</Option>
                </Select>
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton disabled={!isDirty} onClick={saveSettingsToDB}>Save</ContainedButton>
                <OutlinedButton disabled={!isDirty} onClick={resetData}>Cancel</OutlinedButton>
            </ButtonRow>
        </CenterBody>
    );
};