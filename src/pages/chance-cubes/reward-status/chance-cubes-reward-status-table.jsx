import { useContext } from 'react';
import styled from 'styled-components';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ToastContext } from '../../../contexts/toast-context';
import { ChanceCubesRewardInfoOverlay } from '../../../overlays/chance-cubes/chance-cubes-reward-info-overlay';
import { ChanceCubesRewardEditOverlay } from '../../../overlays/chance-cubes/chance-cubes-reward-edit-overlay';
import { TextToast } from '../../../toasts/text-toast';
import { ChanceCubesRewardStatusCell } from './chance-cubes-reward-status-row';
import { gameVersions } from './chance-cubes-rewards-status';

const TableWrapper = styled.table`
    margin: 0 8px;
    width: calc(100% - 20px);
`;

const IconsWrapper = styled.td`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    color: ${props => props.theme.color.textPrimary};
`;

const RewardNameWrapper = styled.td`
    color: ${props => props.isGCCR ? props.theme.color.primaryLight : props.theme.color.textPrimary};
`

const ChanceValueWrapper = styled.td`
    color: ${props => props.isGCCR ? props.theme.color.primaryLight : props.theme.color.textPrimary};
    text-align: center;
`

export const ChanceCubesRewardStatusTable = ({ allRewards, shownRewards, notes, highlightedReward, canEdit }) => {

    const overlay = useContext(OverlayContext);
    const toast = useContext(ToastContext);

    const showRewardOverlay = (name, data) => {
        overlay.pushCurrentOverlay(<ChanceCubesRewardInfoOverlay name={name} data={data} />);
    };

    const showRewardEditOverlay = (name, data) => {
        overlay.pushCurrentOverlay(<ChanceCubesRewardEditOverlay name={name} data={data} />);
    };

    const copyToClipBoard = (reward) => {
        navigator.clipboard.writeText(`https://site.theturkey.dev/chancecubes/rewardstatus?reward=${reward}`);
        toast.pushToast(<TextToast text='URL copied to clipboard' />);
    };

    return (
        <TableWrapper className='table sticky-table'>
            <thead>
                <tr className='text-center text-light'>
                    <th></th>
                    <th>Reward/ Version</th>
                    <th>Chance</th>
                    {
                        gameVersions.map(v => <th key={v}>{v}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    shownRewards.map(reward => {
                        const isGCCReward = allRewards[reward].isgcr;
                        return (
                            <tr key={reward} id={reward} className={highlightedReward === reward ? 'highlight-fade' : ''}>
                                <IconsWrapper>
                                    <i className='clickable fas fa-link' onClick={() => copyToClipBoard(reward)} />
                                    <i className='clickable fas fa-info-circle' onClick={() => showRewardOverlay(reward, allRewards[reward])} />
                                    {canEdit && <i className='clickable fas fa-edit' onClick={() => showRewardEditOverlay(reward, allRewards[reward])} />}
                                </IconsWrapper>
                                <RewardNameWrapper isGCCR={isGCCReward}> {reward} </RewardNameWrapper>
                                <ChanceValueWrapper isGCCR={isGCCReward}> {isGCCReward ? 'GCC*' : allRewards[reward].chance} </ChanceValueWrapper>
                                {
                                    gameVersions.map(version => {
                                        const status = Object.prototype.hasOwnProperty.call(allRewards[reward].versions, version) ? allRewards[reward].versions[version] : 0;
                                        const rewardNotes = notes.filter(note => note.version === version && note.reward_name === reward);
                                        return (
                                            <ChanceCubesRewardStatusCell key={`${reward}-${version}`} notes={rewardNotes} status={status} />
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </TableWrapper>
    )
}