import styled from 'styled-components';
import { ChanceCubesRewardInfoModal } from '../../../modals/chance-cubes/chance-cubes-reward-info-modal';
import { ChanceCubesRewardEditModal } from '../../../modals/chance-cubes/chance-cubes-reward-edit-modal';
import { ChanceCubesRewardStatusCell } from './chance-cubes-reward-status-row';
import { gameVersions } from './chance-cubes-rewards-status';
import { Icon, TD, TextToast, useToast } from 'gobble-lib-react';
import { CCVersionedRewardData } from '../../../types/chance-cubes/chance-cubes-versioned-reward';
import { ChanceCubesRewardNote } from '../../../types/chance-cubes/chance-cubes-reward-note';
import { useState } from 'react';

const IconsWrapper = styled(TD)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    color: ${({ theme }) => theme.background.on};
`;

type WrapperProps = {
    readonly isGCCR: boolean
}

const RewardNameWrapper = styled(TD) <WrapperProps>`
    color: ${({ isGCCR, theme }) => isGCCR ? theme.secondary.color : theme.surface.on};
`;

const ChanceValueWrapper = styled(TD) <WrapperProps>`
    color: ${({ isGCCR, theme }) => isGCCR ? theme.secondary.color : theme.surface.on};
    text-align: center;
`;

type ChanceCubesRewardStatusTableItemProps = {
    readonly reward: string
    readonly rewardData: CCVersionedRewardData
    readonly highlightedReward: string
    readonly canEdit: boolean
    readonly notes: readonly ChanceCubesRewardNote[]
}

export const ChanceCubesRewardStatusTableItem = ({ reward, rewardData, highlightedReward, canEdit, notes }: ChanceCubesRewardStatusTableItemProps) => {
    const { pushToast } = useToast();

    const [showRewardEditOverlay, setShowRewardEditOverlay] = useState(false);
    const [showRewardOverlay, setShowRewardOverlay] = useState(false);

    const copyToClipBoard = (reward: string) => {
        navigator.clipboard.writeText(`https://theturkey.dev/chancecubes/rewardstatus?reward=${reward}`);
        pushToast(<TextToast text='URL copied to clipboard' />);
    };

    return (
        <tr id={reward} className={highlightedReward === reward ? 'highlight-fade' : ''}>
            <IconsWrapper>
                <Icon className='fas fa-link' onClick={() => copyToClipBoard(reward)} />
                <Icon className='fas fa-info-circle' onClick={() => setShowRewardOverlay(true)} />
                {canEdit && <Icon className='fas fa-edit' onClick={() => setShowRewardEditOverlay(true)} />}
            </IconsWrapper>
            <RewardNameWrapper isGCCR={rewardData.isgcr}> {reward} </RewardNameWrapper>
            <ChanceValueWrapper isGCCR={rewardData.isgcr}> {rewardData.isgcr ? 'GCC*' : rewardData.chance} </ChanceValueWrapper>
            {
                gameVersions.map(version => {
                    const status = rewardData.versions[version] ?? 0;
                    const rewardNotes = notes.filter(note => note.version === version && note.reward_name === reward);
                    return (
                        <ChanceCubesRewardStatusCell key={`${reward}-${version}`} notes={rewardNotes} status={status} />
                    );
                })
            }
            {showRewardEditOverlay && <ChanceCubesRewardEditModal show={showRewardEditOverlay} requestClose={() => setShowRewardEditOverlay(false)} name={reward} data={rewardData} />}
            {showRewardOverlay && <ChanceCubesRewardInfoModal show={showRewardOverlay} requestClose={() => setShowRewardOverlay(false)} name={reward} data={rewardData} />}
        </tr>
    );
};