import styled from 'styled-components';
import { useOverlay } from '../../../../contexts/overlay-context';
import { useToast } from '../../../../contexts/toast-context';
import { StreamAnimationSettingsOverlay } from './stream-animations-settings-overlay';
import * as API from '../../../../network/stream-animations-network';
import { TextToast } from '../../../../toasts/text-toast';
import { ConfirmationOverlay } from '../../../../overlays/confirmation-overlay';

const ActionsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 8px;
`;

export const StreamAnimationItem = ({ animation, channelPointRewards, rewardData, save, remove }) => {
    const { pushCurrentOverlay, popCurrentOverlay } = useOverlay();
    const { pushToast } = useToast();


    const edit = () => {
        const saveSettings = (values) => {
            const toSave = { ...rewardData }
            Object.keys(values).map(k => toSave[k] = ({ value: values[k] }));
            save(animation.id, toSave);
        }
        pushCurrentOverlay(<StreamAnimationSettingsOverlay animation={animation} userData={rewardData} channelPointRewards={channelPointRewards} save={saveSettings} />)
    }

    const test = () => {
        API.testAnimation(animation.id).then(() => {
            pushToast(<TextToast text='Animation test triggered!' />);
        });
    }

    const deleteAnimation = () => {
        pushCurrentOverlay(
            <ConfirmationOverlay
                text={'Are you sure you want to delete this animation? You will lose all configured settings!'}
                options={[
                    {
                        text: 'Yes',
                        callback: () => {
                            popCurrentOverlay();
                            remove();
                        },
                    },
                    { text: 'No', callback: () => popCurrentOverlay() },
                ]}
            />
        );
    };

    return (
        <>
            <ActionsWrapper>
                <i className='fas fa-trash clickable' title='Delete' onClick={() => deleteAnimation()} />
                <i className='fas fa-edit clickable' title='Edit' onClick={() => edit()} />
                <i className='fas fa-play clickable' title='Test' onClick={() => test()} />
            </ActionsWrapper>
            <span>{animation.display}</span>
            <select value={rewardData.channel_point?.value ?? ''} onChange={e => { rewardData.channel_point.value = e.target.value; save(animation.id, rewardData); }}>
                <option value=''>N/A</option>
                {
                    channelPointRewards.map(reward => (
                        <option key={reward.id} value={reward.id}>
                            {reward.title}
                        </option>
                    ))
                }
            </select>
            <div />
        </>
    )
}