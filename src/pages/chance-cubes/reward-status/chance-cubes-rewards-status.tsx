import { BaseTheme, Body1, ContainedButton, Loading, useUrlParams } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { ChanceCubesRewardCreateModal } from '../../../modals/chance-cubes/chance-cubes-reward-create-modal';
import { getChanceCubesRewardStatus } from '../../../network/chance-cubes-network';
import { ChanceCubesRewardNote } from '../../../types/chance-cubes/chance-cubes-reward-note';
import { CCVersionReward } from '../../../types/chance-cubes/chance-cubes-versioned-reward';
import { ChanceCubesRewardStatusStats } from './chance-cubes-reward-status-stats';
import { ChanceCubesRewardStatusTable } from './chance-cubes-reward-status-table';

export const statusInfo = [
    { bg: '#8f8f8f', color: 'black', text: 'Untested' },
    { bg: '#046e22', color: '', text: 'Working' },
    { bg: '#edda09', color: 'black', text: 'Not Working' },
    { bg: '#bf0000', color: '', text: 'Bugged' },
    { bg: '#1f1f1f', color: '', text: 'Not Available' },
];

export const gameVersions = [
    '1.7.10',
    '1.8',
    '1.9',
    '1.10',
    '1.11',
    '1.12',
    '1.13',
    '1.14',
    '1.15',
    '1.16',
    '1.17',
    '1.18',
];

const RewardStatusWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

const GCCRewardText = styled.div`
 color: ${({ theme }: ThemeProps<BaseTheme>) => theme.secondary.color};
`;

const StatusChipsWrapper = styled.div`
    margin-left: 8px;
    display: flex;
    gap: 8px;
`;

const StatusChip = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    width: 125px;
    padding: 4px 8px;
`;

export const ChanceCubesRewardsStatus = () => {
    const { permissions } = useAuth();

    const { reward } = useUrlParams();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [rewards, setRewards] = useState<CCVersionReward>({});
    const [notes, setNotes] = useState<readonly ChanceCubesRewardNote[]>([]);
    const [loading, setLoading] = useState(true);

    const canEdit = permissions.includes('chancecubes.managerewards');

    useEffect(() => {
        getChanceCubesRewardStatus()
            .then(json => {
                // eslint-disable-next-line functional/no-let
                const rewards = json.rewards.reduce((prev, curr) => {
                    if (Object.keys(prev).includes(curr.name)) {
                        return {
                            ...prev,
                            [curr.name]: {
                                ...prev[curr.name],
                                versions: {
                                    ...prev[curr.name].versions,
                                    [curr.version]: curr.status,
                                }
                            }
                        };
                    }
                    return {
                        ...prev,
                        [curr.name]: {
                            versions: {
                                [curr.version]: curr.status,
                            },
                            chance: curr.chance,
                            isgcr: curr.is_giant_cube_reward
                        }
                    };
                }, {} as CCVersionReward);

                setNotes(json.notes);
                setRewards(rewards);
                setLoading(false);

                if (reward)
                    setTimeout(() => {
                        document.getElementById(reward)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }, 1000);
            });
    }, []);

    if (loading)
        return <Loading />;

    return (
        <RewardStatusWrapper>
            <ChanceCubesRewardStatusStats rewards={rewards} />
            <StatusChipsWrapper>
                {
                    statusInfo.map(json => (
                        <StatusChip key={json.text} style={{ background: json.bg }}>
                            <Body1 style={{ color: json.color }}>{json.text}</Body1>
                        </StatusChip>
                    ))
                }
                {
                    canEdit && <ContainedButton onClick={() => setShowCreateModal(true)}>Add Reward</ContainedButton>
                }
            </StatusChipsWrapper>
            <GCCRewardText>
                *GCC = Giant Chance Cube Reward
            </GCCRewardText>
            <ChanceCubesRewardStatusTable
                allRewards={rewards}
                shownRewards={Object.keys(rewards).filter(entry => !entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b))}
                notes={notes}
                highlightedReward={reward}
                canEdit={canEdit}
            />
            {/* <div className='mt-4'>
                <h3 className='m-0'>Custom User Rewards</h3>
            </div>
            <ChanceCubesRewardStatusTable
                allRewards={rewards}
                shownRewards={Object.keys(rewards).filter(entry => entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b))}
                notes={notes}
                highlightedReward={reward}
                canEdit={canEdit}
            /> */}
            <ChanceCubesRewardCreateModal show={showCreateModal} requestClose={() => setShowCreateModal(false)} />
        </RewardStatusWrapper>
    );
};