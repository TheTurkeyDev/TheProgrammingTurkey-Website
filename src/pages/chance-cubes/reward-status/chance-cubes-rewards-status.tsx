import { BaseTheme, ContainedButton, Loading, useUrlParams } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { ChanceCubesRewardCreateModal } from '../../../modals/chance-cubes/chance-cubes-reward-create-modal';
import { getChanceCubesRewardStatus } from '../../../network/chance-cubes-network';
import { ChanceCubesRewardNote } from '../../../types/chance-cubes/chance-cubes-reward-note';
import { CCVersionReward } from '../../../types/chance-cubes/chance-cubes-versioned-reward';
import { Mapped } from '../../../types/mapped';
import { ChanceCubesRewardStatusTable } from './chance-cubes-reward-status-table';

export const statusInfo = [
    { bg: '#8f8f8f', text: 'Untested' },
    { bg: '#046e22', text: 'Working' },
    { bg: '#edda09', text: 'Not Working' },
    { bg: '#bf0000', text: 'Bugged' },
    { bg: '#1f1f1f', text: 'Not Available' },
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

const ColDiv = styled.div`
    width: 150px;
    max-width: 150px;
`;

const GCCRewardText = styled.div`
 color: ${({ theme }: ThemeProps<BaseTheme>) => theme.primary.color};
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
                let rewards = json.rewards.reduce((prev, curr) => {
                    if (Object.keys(prev).includes(curr.name)) {
                        return {
                            ...prev, [curr.name]: {
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
        <>
            <div className='m-2'>
                <div className='container'>
                    <div className='row'>
                        <ColDiv className='col text-right'>
                            Game Version
                        </ColDiv>
                        <ColDiv className='col'>
                            Reward Status
                        </ColDiv>
                        <ColDiv className='col'>
                            %
                        </ColDiv>
                        <ColDiv className='col m-0 p-0'>
                            Rewards Working
                        </ColDiv>
                        <ColDiv className='col'>
                            %
                        </ColDiv>
                        <div className='col'>

                        </div>
                    </div>
                    {
                        Object.entries(computeVersionCompletion(rewards)).map(entry => {
                            return (
                                <div key={entry[0]} className='row'>
                                    <ColDiv className='col text-right'>
                                        {entry[0]}:
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {entry[1].completed}/{entry[1].total}
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {(entry[1].completed / entry[1].total * 100).toFixed(2)}%
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {entry[1].working} / {entry[1].completed}
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {(entry[1].working / (entry[1].completed === 0 ? 1 : entry[1].completed) * 100).toFixed(2)}%
                                    </ColDiv>
                                    <div className='col'>

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='text-center m-0 ml-2 fluid-container row'>
                {
                    statusInfo.map(json => (
                        <div key={json.text} className='col-auto m-2' style={{ background: json.bg, width: '125px' }}>
                            {json.text}
                        </div>
                    ))
                }
                {
                    canEdit && <ContainedButton className='m-2' onClick={() => setShowCreateModal(true)}>Add Reward</ContainedButton>
                }
            </div>
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
            <div className='mt-4'>
                <h3 className='m-0'>Custom User Rewards</h3>
            </div>
            <ChanceCubesRewardStatusTable
                allRewards={rewards}
                shownRewards={Object.keys(rewards).filter(entry => entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b))}
                notes={notes}
                highlightedReward={reward}
                canEdit={canEdit}
            />
            <ChanceCubesRewardCreateModal show={showCreateModal} requestClose={() => setShowCreateModal(false)} />
        </>
    );
};

function computeVersionCompletion(rewards: CCVersionReward) {

    const base = gameVersions.reduce((prev, curr) => prev[curr] = { completed: 0, total: 0, working: 0 }, {} as Mapped);
    return Object.keys(rewards).reduce((prev, curr) => {
        if (!curr.startsWith('chancecubes:cr')) {
            gameVersions.forEach(version => {
                const status = rewards[curr].versions[version] ?? 0;
                if (status !== 4) {
                    prev[version].total += 1;

                    if (status !== 0) {
                        prev[version].completed += 1;
                        if (status === 1) {
                            prev[version].working += 1;
                        }
                    }
                }
            });
        }
        return prev;
    }, base);
}
