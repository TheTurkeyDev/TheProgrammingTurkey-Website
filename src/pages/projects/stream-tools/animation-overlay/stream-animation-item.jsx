import { useContext } from 'react';
import styled from 'styled-components';
import { OverlayContext } from '../../../../contexts/overlay-context';
import { StreamAnimationSettingsOverlay } from './stream-animations-settings-overlay';

import * as API from '../../../../network/stream-animations-network';
import { ToastContext } from '../../../../contexts/toast-context';
import { TextToast } from '../../../../toasts/text-toast';

const ActionsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 8px;
`;

export const StreamAnimationItem = ({ animation, channelPointRewards, rewardData, save, remove }) => {
    const overlay = useContext(OverlayContext);
    const toast = useContext(ToastContext);

    const edit = () => {
        const saveSettings = (values) => {
            const toSave = { ...rewardData }
            Object.keys(values).map(k => toSave[k] = ({ value: values[k] }));
            save(animation.id, toSave);
        }
        overlay.pushCurrentOverlay(<StreamAnimationSettingsOverlay animation={animation} userData={rewardData} channelPointRewards={channelPointRewards} save={saveSettings} />)
    }

    const test = () => {
        API.testAnimation(animation.id).then(() => {
            toast.pushToast(<TextToast text='Animation test triggered!' />);
        });
    }

    return (
        <>
            <ActionsWrapper>
                <i className='fas fa-trash clickable' onClick={() => remove()} />
                <i className='fas fa-edit clickable' onClick={() => edit()} />
                <i className='fas fa-play clickable' onClick={() => test()} />
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