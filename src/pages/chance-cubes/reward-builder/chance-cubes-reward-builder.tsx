import { ContainedButton, Headline3 } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ChanceCubesRewardType } from '../../../types/chance-cubes/chance-cubes-reward';
import { ChanceCubesReward } from './chance-cubes-reward';
import { MultiChanceCubesRewards } from './multi-chance-cubes-rewards';
import { RewardImportModal } from './reward-import-modal';
import { RewardJsonViewer } from './reward-json-viewer';

const colors = ['#61a11f', '#445f8b', '#a6142a', '#c1fda1', '#fd3bf1', '#3d9bf3', '#62b770', '#af2ea2'];

const RewardsWrapper = styled.div`
    margin: 8px;
`;

export const ChanceCubesRewardBuilder = () => {
    const [showRewardImport, setShowRewardImport] = useState(false);
    const [rewards, setRewards] = useState<MultiChanceCubesRewards>({});

    const addReward = () => {
        setRewards(old => ({
            ...old,
            [`new_reward_${Object.keys(old).length + 1}`]: { chance: 0, isGiantCubeReward: false, dependencies: {} }
        }));
    };

    const removeReward = (rewardId: string) => {
        setRewards(old => ({ ...Object.fromEntries(Object.entries(old).filter(([k]) => k !== rewardId)) }));
    };

    const setRewardID = (oldId: string, newId: string) => {
        setRewards(old => ({
            ...Object.fromEntries(Object.entries(old).filter(([k]) => k !== oldId)),
            [newId]: old[oldId]
        }));
    };

    const setRewardState = (rewardId: string, json: ChanceCubesRewardType) => {
        setRewards(old => ({ ...old, [rewardId]: json }));
    };

    return (
        <>
            <RewardJsonViewer rewards={rewards} />
            <RewardsWrapper>
                <Headline3>Chance Cubes Reward Builder</Headline3>
                <ContainedButton onClick={() => setShowRewardImport(true)}>Import Reward</ContainedButton>
                {
                    Object.keys(rewards).map((reward, i) => {
                        return (
                            <ChanceCubesReward
                                key={i}
                                setRewardID={setRewardID}
                                setRewardState={setRewardState}
                                rewardId={reward}
                                reward={rewards[reward]}
                                color={colors[i % colors.length]}
                                removeReward={() => removeReward(reward)}
                            />
                        );
                    })
                }
                <ContainedButton onClick={() => addReward()}>Add Reward</ContainedButton>
            </RewardsWrapper>
            <RewardImportModal show={showRewardImport} requestClose={() => setShowRewardImport(false)} importRewards={rewards => { setRewards(rewards); setShowRewardImport(false); }} />
        </>
    );
};