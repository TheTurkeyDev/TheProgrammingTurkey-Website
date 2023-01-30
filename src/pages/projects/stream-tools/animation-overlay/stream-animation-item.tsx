import styled from 'styled-components';
import { StreamAnimationSettingsModal } from './stream-animations-settings-modal';
import * as API from '../../../../network/stream-animations-network';
import { Body1, ConfirmationModal, Option, Select, TextToast, useToast } from 'gobble-lib-react';
import { StreamAnimation } from '../../../../types/stream-animations/stream-animation';
import { TwitchChannelPointReward } from '../../../../types/stream-animations/twitch-channel-point-reward';
import { StreamAnimationUserDataPoint } from '../../../../types/stream-animations/stream-animation-user-data';
import { useState } from 'react';
import { Mapped } from '../../../../types/mapped';
import { UserAnimationSettings } from './mapped-stream-animation-user-data';
import { Icon } from '../../../../components/icon';

const ActionsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 8px;
`;

type StreamAnimationItemProps = {
    readonly animation: StreamAnimation
    readonly channelPointRewards: readonly TwitchChannelPointReward[]
    readonly animSettings: UserAnimationSettings
    readonly save: (id: string, data: Mapped) => void
    readonly remove: () => void
}
export const StreamAnimationItem = ({ animation, channelPointRewards, animSettings, save, remove }: StreamAnimationItemProps) => {
    const { pushToast } = useToast();

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const test = () => {
        API.testAnimation(animation.id).then(() => {
            pushToast(<TextToast text='Animation test triggered!' />);
        });
    };

    return (
        <>
            <ActionsWrapper>
                <Icon name='fas fa-trash' title='Delete' onClick={() => setShowConfirmationModal(true)} />
                <Icon name='fas fa-edit' title='Edit' onClick={() => setShowSettingsModal(true)} />
                <Icon name='fas fa-play' title='Test' onClick={() => test()} />
            </ActionsWrapper>
            <Body1>{animation.display}</Body1>
            <Body1>//Coming soon!</Body1>
            <Body1>Channel Point</Body1>
            {showSettingsModal && <StreamAnimationSettingsModal show={showSettingsModal} requestClose={() => setShowSettingsModal(false)} animation={animation} animSettings={animSettings} channelPointRewards={channelPointRewards} save={data => save(animation.id, data)} />}
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