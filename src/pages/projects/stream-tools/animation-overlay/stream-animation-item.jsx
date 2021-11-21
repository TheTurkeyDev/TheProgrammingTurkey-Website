import { useContext } from 'react';
import styled from 'styled-components';
import { OverlayContext } from '../../../../contexts/overlay-context';
import { StreamAnimationSettingsOverlay } from './stream-animations-settings-overlay';

const ActionsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
`;

export const StreamAnimationItem = ({ animation, channelPointRewards, rewardData, save, remove }) => {

    const overlay = useContext(OverlayContext)

    const edit = () => {
        const saveSettings = (values) => {
            const toSave = { ...rewardData }
            Object.keys(values).map(k => toSave[k] = ({ value: values[k] }));
            save(animation.id, toSave);
        }
        overlay.pushCurrentOverlay(<StreamAnimationSettingsOverlay animation={animation} userData={rewardData} channelPointRewards={channelPointRewards} save={saveSettings} />)
    }

    return (
        <>
            <ActionsWrapper><i className='fas fa-trash clickable' onClick={() => remove()} /><i className='fas fa-edit clickable' onClick={() => edit()} /></ActionsWrapper>
            <span>{animation.display}</span>
            <select value={rewardData.channel_point.value} onChange={e => { rewardData.channel_point.value = e.target.value; save(animation.id, rewardData); }}>
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