import { ContainedButton, Input, Loading, Modal, Select } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as API from '../../../../network/stream-animations-network';
import { Mapped } from '../../../../types/mapped';
import { StreamAnimation } from '../../../../types/stream-animations/stream-animation';
import { StreamAnimationSettingDef } from '../../../../types/stream-animations/stream-animation-settings-def';
import { TwitchChannelPointReward } from '../../../../types/stream-animations/twitch-channel-point-reward';
import { UserAnimationSettings } from './mapped-stream-animation-user-data';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-items: center;
`;

const SettingsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const Label = styled.span`
    justify-self: right;
`;

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const getInputForSetting = (def: StreamAnimationSettingDef, value: string, onChange: (val: string) => void) => {
    switch (def.type) {
        case 'integer':
            return <Input key={def.id} type='number' name={def.id} label={def.display} value={value} onChange={e => onChange(`${clamp(parseInt(e.target.value), 0, 1000)}`)} min={0} max={1000} />;
        case 'string':
            return <Input key={def.id} name={def.id} label={def.display} value={value} onChange={e => onChange(e.target.value)} />;
    }
};

type StreamAnimationSettingsModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly animation: StreamAnimation
    readonly animSettings: UserAnimationSettings
    readonly channelPointRewards: readonly TwitchChannelPointReward[]
    readonly save: (values: Mapped) => void
}

export const StreamAnimationSettingsModal = ({ show, requestClose, animation, animSettings, channelPointRewards, save }: StreamAnimationSettingsModalProps) => {
    const [settingsDefs, setSettingsDefs] = useState<readonly StreamAnimationSettingDef[]>([]);
    const [values, setValues] = useState<Mapped>();

    useEffect(() => {
        API.getSettingDef(animation.id).then(settings => {
            setValues(settings.reduce((prev, curr) => {
                return {
                    ...prev,
                    [curr.id]: (animSettings as Mapped)[curr.id]?.value ?? curr.default_val
                };
            }, {} as UserAnimationSettings));
            setSettingsDefs(settings);
        });
    }, []);

    const updateValue = (id: string, val: string) => {
        setValues(old => {
            return { ...old!, [id]: val };
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            {
                values ?
                    <ContentWrapper>
                        <h2>{animation.display}</h2>
                        <SettingsWrapper>
                            <Select label='Channel Point' value={values.channel_point} onChange={e => updateValue('channel_point', e.target.value)}>
                                <option value=''>N/A</option>
                                {
                                    channelPointRewards.map(reward => (
                                        <option key={reward.id} value={reward.id}>
                                            {reward.title}
                                        </option>
                                    ))
                                }
                            </Select>
                            {
                                settingsDefs.filter(def => def.id !== 'channel_point').map(def =>
                                    getInputForSetting(def, values[def.id], val => updateValue(def.id, val))
                                )
                            }
                        </SettingsWrapper>
                        <ContainedButton onClick={() => save(values)}>Save</ContainedButton>
                    </ContentWrapper>
                    :
                    <Loading />
            }
        </Modal>
    );
};