import styled from 'styled-components';
import { StreamAnimationSettingsModal } from './stream-animations-settings-modal';
import * as API from '../../../../network/stream-animations-network';
import { Body1, ConfirmationModal, Option, Select, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { StreamAnimation } from '../../../../types/stream-animations/stream-animation';
import { TwitchChannelPointReward } from '../../../../types/stream-animations/twitch-channel-point-reward';
import { StreamAnimationUserDataPoint } from '../../../../types/stream-animations/stream-animation-user-data';
import { useState } from 'react';
import { Mapped } from '../../../../types/mapped';
import { UserAnimationSettings } from './mapped-stream-animation-user-data';

const ActionsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 8px;
`;

type StreamAnimationItemProps = {
    readonly animation: StreamAnimation
    readonly channelPointRewards: readonly TwitchChannelPointReward[]
    readonly animSettings: UserAnimationSettings
    readonly save: (id: string, data: UserAnimationSettings) => void
    readonly remove: () => void
}
export const StreamAnimationItem = ({ animation, channelPointRewards, animSettings, save, remove }: StreamAnimationItemProps) => {
    const { pushToast } = useToast();

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const saveSettings = (values: UserAnimationSettings) => {
        const toSave = { ...animSettings };
        Object.keys(values).map(k => (toSave as Mapped)[k] = ({ value: (values as Mapped)[k] }));
        save(animation.id, toSave);
    };

    const test = () => {
        API.testAnimation(animation.id).then(() => {
            pushToast(<TextToast text='Animation test triggered!' />);
        });
    };

    return (
        <>
            <ActionsWrapper>
                <i className='fas fa-trash clickable' title='Delete' onClick={() => setShowConfirmationModal(true)} />
                <i className='fas fa-edit clickable' title='Edit' onClick={() => setShowSettingsModal(true)} />
                <i className='fas fa-play clickable' title='Test' onClick={() => test()} />
            </ActionsWrapper>
            <Body1>{animation.display}</Body1>
            <Body1>//TODO</Body1>
            <Body1>Channel Points //TODO</Body1>
            {/* <Select value={animSettings.channel_point.value ?? ''} onChange={e => { save(animation.id, { ...animSettings, channel_point: { ...animSettings.channel_point, value: e.target.value } }); }}>
                <Option value=''>N/A</Option>
                {
                    channelPointRewards.map(reward => (
                        <Option key={reward.id} value={reward.id}>
                            {reward.title}
                        </Option>
                    ))
                }
            </Select> */}
            {/* <StreamAnimationSettingsModal show={showSettingsModal} requestClose={() => setShowSettingsModal(false)} animation={animation} animSettings={animSettings} channelPointRewards={channelPointRewards} save={saveSettings} /> */}
            <ConfirmationModal
                show={showConfirmationModal}
                requestClose={() => setShowConfirmationModal(false)}
                text={'Are you sure you want to delete this animation? You will lose all configured settings!'}
                yesText='Yes'
                onYesClick={() => {
                    setShowConfirmationModal(false);
                    remove();
                }}
                noText='No'
                onNoClick={() => setShowConfirmationModal(false)} />
        </>
    );
};