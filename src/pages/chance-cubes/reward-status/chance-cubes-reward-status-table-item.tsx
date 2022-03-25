import styled, { ThemedStyledProps } from 'styled-components';
import { ChanceCubesRewardInfoModal } from '../../../modals/chance-cubes/chance-cubes-reward-info-modal';
import { ChanceCubesRewardEditModal } from '../../../modals/chance-cubes/chance-cubes-reward-edit-modal';
import { ChanceCubesRewardStatusCell } from './chance-cubes-reward-status-row';
import { gameVersions } from './chance-cubes-rewards-status';
import { BaseTheme, TD, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { CCVersionedRewardData } from '../../../types/chance-cubes/chance-cubes-versioned-reward';
import { ChanceCubesRewardNote } from '../../../types/chance-cubes/chance-cubes-reward-note';
import { useState } from 'react';

const IconsWrapper = styled(TD)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    color: ${props => props.theme.color.textPrimary};
`;

type WrapperProps = {
    readonly isGCCR: boolean
}

const RewardNameWrapper = styled(TD)`
    color: ${({ isGCCR, theme }: ThemedStyledProps<WrapperProps, BaseTheme>) => isGCCR ? theme.surface.on : theme.primary.color};
`;

const ChanceValueWrapper = styled(TD)`
     color: ${({ isGCCR, theme }: ThemedStyledProps<WrapperProps, BaseTheme>) => isGCCR ? theme.surface.on : theme.primary.color};
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
        navigator.clipboard.writeText(`https://site.theturkey.dev/chancecubes/rewardstatus?reward=${reward}`);
        pushToast(<TextToast text='URL copied to clipboard' />);
    };

    return (
        <tr key={reward} id={reward} className={highlightedReward === reward ? 'highlight-fade' : ''}>
            <IconsWrapper>
                <i className='clickable fas fa-link' onClick={() => copyToClipBoard(reward)} />
                <i className='clickable fas fa-info-circle' onClick={() => setShowRewardOverlay(true)} />
                {canEdit && <i className='clickable fas fa-edit' onClick={() => setShowRewardEditOverlay(true)} />}
            </IconsWrapper>
            <RewardNameWrapper isGCCR={rewardData.isgcr}> {reward} </RewardNameWrapper>
            <ChanceValueWrapper isGCCR={rewardData.isgcr}> {rewardData.isgcr ? 'GCC*' : rewardData.chance} </ChanceValueWrapper>
            {
                gameVersions.map(version => {
                    const status = Object.prototype.hasOwnProperty.call(rewardData.versions, version) ? rewardData.versions[version] : 0;
                    const rewardNotes = notes.filter(note => note.version === version && note.reward_name === reward);
                    return (
                        <ChanceCubesRewardStatusCell key={`${reward}-${version}`} notes={rewardNotes} status={status} />
                    );
                })
            }
            <ChanceCubesRewardEditModal show={showRewardEditOverlay} requestClose={() => setShowRewardEditOverlay(false)} name={reward} data={rewardData} />
            <ChanceCubesRewardInfoModal show={showRewardOverlay} requestClose={() => setShowRewardOverlay(false)} name={reward} data={rewardData} />
        </tr>
    );
};