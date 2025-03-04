import { Body1, ButtonRow, ContainedButton, Headline3, HorizontalRule, Input, InputsWrapper, Loading, Option, OutlinedButton, Select, ToggleSwitch, useFetch, useQuery } from 'gobble-lib-react';
import { getDevAPIBase, getTwitchOverlaySiteBase } from '../../../../network/network-helper';
import { getGetAuthParams, getPostAuthParams } from '../../../../network/auth-network';
import { TwitchClipShoutoutSettings } from './twitch-clip-shoutout-settings';
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
    const [settings, loading, { refetch, setData, isDirty, resetData, error }] = useFetch<TwitchClipShoutoutSettings>(`${getDevAPIBase()}/twitch-clip-shoutout`, { requestData: getGetAuthParams() });
    const [saveSettings] = useQuery<{ readonly token: string }>(`${getDevAPIBase()}/twitch-clip-shoutout`, { requestData: getPostAuthParams(), shouldThrow: true });
    const [regenToken] = useQuery<{ readonly token: string }>(`${getDevAPIBase()}/twitch-clip-shoutout/regentoken`, { requestData: getPostAuthParams() });

    if (loading)
        return <Loading />;

    if (error)
        return <Body1>ERROR: {error}</Body1>;

    if (!settings)
        return <Body1>Response missing?</Body1>;

    if (!settings.hasTwitchAccount)
        return <Body1>You need a Twitch account to use this app!</Body1>;

    if (!settings.hasScopes)
        return <Body1>This app requires additional Twitch scopes... Contact Turkey</Body1>;

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
                <ToggleSwitch label='Enabled' checked={settings.enabled} onClick={() => setData({ ...settings, enabled: !settings.enabled })} />
                <Select label='Restrict To' value={settings.usageControl} onChange={e => setData({ ...settings, usageControl: parseInt(e.target.value) })}>
                    <Option value={TwitchChatRoleLevel.STREAMER}>Streamer</Option>
                    <Option value={TwitchChatRoleLevel.EVERYONE}>Everyone</Option>
                </Select>
                <Input label='Min Length' type='number' value={settings.minLength} min={0} max={60} step={1} onChange={e => setData({ ...settings, minLength: Math.min(settings.maxLength, parseInt(e.target.value)), maxLength: Math.max(settings.maxLength, parseInt(e.target.value)) })} />
                <Input label='Max Length' type='number' value={settings.maxLength} min={0} max={60} step={1} onChange={e => setData({ ...settings, minLength: Math.min(settings.minLength, parseInt(e.target.value)), maxLength: Math.max(settings.minLength, parseInt(e.target.value)) })} />
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton disabled={!isDirty} onClick={saveSettingsToDB}>Save</ContainedButton>
                <OutlinedButton disabled={!isDirty} onClick={resetData}>Cancel</OutlinedButton>
            </ButtonRow>
        </CenterBody>
    );
};