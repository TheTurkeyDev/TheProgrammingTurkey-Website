import { Body1, ButtonRow, ContainedButton, Headline3, Headline5, HorizontalRule, Input, InputsWrapper, Loading, Option, OutlinedButton, Select, ToggleSwitch, useFetch, useQuery } from 'gobble-lib-react';
import { getDevAPIBase, getTwitchOverlaySiteBase } from '../../../../network/network-helper';
import { getGetAuthParams, getPostAuthParams } from '../../../../network/auth-network';
import { TwitchClipShoutoutSettings } from './twitch-clip-shoutout-settings';
import { styled } from 'styled-components';
import { SecretURL } from '../../../../components/secret-url';
import { TwitchChatRoleLevel } from './twitch-chat-role-level';
import { IconWithPopOver } from '../../../../components/pop-over';
import { useState } from 'react';
import { TwitchChannelPointReward } from '../../../../types/stream-animations/twitch-channel-point-reward';

const CenterBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    max-width: 900px;
    padding: 0 16px;
    margin-inline: auto;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TwitchClipShoutout = () => {
    const [settings, loading, { refetch, setData, isDirty, resetData, error }] = useFetch<TwitchClipShoutoutSettings>(`${getDevAPIBase()}/twitch-clip-shoutout`, { requestData: getGetAuthParams() });
    const [channelPointRewards, loadingCPR] = useFetch<readonly TwitchChannelPointReward[]>(`${getDevAPIBase()}/twitch-clip-shoutout/channel-points`, { requestData: getGetAuthParams() });
    const [saveSettings] = useQuery<{ readonly token: string }>(`${getDevAPIBase()}/twitch-clip-shoutout`, { requestData: getPostAuthParams(), shouldThrow: true });
    const [regenToken] = useQuery<{ readonly token: string }>(`${getDevAPIBase()}/twitch-clip-shoutout/regentoken`, { requestData: getPostAuthParams() });
    const [testShoutout] = useQuery(`${getDevAPIBase()}/twitch-clip-shoutout/test`, { requestData: getPostAuthParams() });

    const [testChannelName, setTestChannelName] = useState('');

    if (loading || loadingCPR)
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

    const testShoutouClick = () => testShoutout(testChannelName);

    const appURL = `${getTwitchOverlaySiteBase()}/clip-shoutout/${settings.token}`;

    return (
        <CenterBody>
            <Headline3>Twitch Clip Shoutout</Headline3>
            <SecretURL url={appURL} regen={onRegenClick} />
            <HorizontalRule />
            <Headline5>Settings</Headline5>
            <InputsWrapper $fullWidth={true} style={{ zIndex: 3 }}>
                <ToggleSwitch label='Enabled' checked={settings.enabled} onClick={() => setData({ ...settings, enabled: !settings.enabled })} />
                <Select label='Restrict To' value={settings.usageControl} onChange={e => setData({ ...settings, usageControl: parseInt(e.target.value) })}>
                    <Option value={TwitchChatRoleLevel.STREAMER}>Streamer</Option>
                    <Option value={TwitchChatRoleLevel.MOD}>Moderator</Option>
                    <Option value={TwitchChatRoleLevel.VIP}>VIP</Option>
                    <Option value={TwitchChatRoleLevel.EVERYONE}>Everyone</Option>
                </Select>
                <Input label='Min Length' type='number' value={settings.minLength} min={0} max={60} step={1} onChange={e => setData({ ...settings, minLength: Math.min(settings.maxLength, parseInt(e.target.value)), maxLength: Math.max(settings.maxLength, parseInt(e.target.value)) })} />
                <Input label='Max Length' type='number' value={settings.maxLength} min={0} max={60} step={1} onChange={e => setData({ ...settings, minLength: Math.min(settings.minLength, parseInt(e.target.value)), maxLength: Math.max(settings.minLength, parseInt(e.target.value)) })} />
                <Input label='Fetch Message' type='text' value={settings.fetchMessage} maxLength={255} onChange={e => setData({ ...settings, fetchMessage: e.target.value })} postfixContent={
                    <IconWithPopOver icon='fas fa-info-circle' direction='left'>
                        <InfoWrapper>
                            <Body1>=== Valid Variables ===</Body1>
                            <Body1>%channelName% = Channel Name</Body1>
                        </InfoWrapper>
                    </IconWithPopOver>
                } />
                <Select label='Animation Direction' value={settings.animationDirection} onChange={e => setData({ ...settings, animationDirection: parseInt(e.target.value) })}>
                    <Option value={-1}>No Animation</Option>
                    <Option value={0}>Top</Option>
                    <Option value={1}>Right</Option>
                    <Option value={2}>Bottom</Option>
                    <Option value={3}>Left</Option>
                </Select>
                <Select label='Channel Point Trigger' value={settings.channelPointId} onChange={e => setData({ ...settings, channelPointId: e.target.value })}>
                    <Option value={undefined}>=== No Channel Point Trigger ===</Option>
                    {
                        (channelPointRewards ?? []).map(cpr => (
                            <Option key={cpr.id} value={cpr.id}>{cpr.title}</Option>
                        ))
                    }
                </Select>
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton disabled={!isDirty} onClick={saveSettingsToDB}>Save</ContainedButton>
                <OutlinedButton disabled={!isDirty} onClick={resetData}>Cancel</OutlinedButton>
            </ButtonRow>
            <HorizontalRule />
            <Headline5>Test</Headline5>
            <InputsWrapper $fullWidth={true}>
                <Input label='Channel Name' value={testChannelName} onChange={e => setTestChannelName(e.target.value)} />
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton onClick={testShoutouClick}>Test</ContainedButton>
            </ButtonRow>
        </CenterBody>
    );
};