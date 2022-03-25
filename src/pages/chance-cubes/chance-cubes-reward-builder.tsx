import { ContainedButton, Headline4, TextArea } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import { ChanceCubesRewardType } from '../../types/chance-cubes/chance-cubes-reward';
import { ChanceCubesReward } from './reward-builder/chance-cubes-reward';

const colors = ['#61a11f', '#445f8b', '#a6142a', '#c1fda1', '#fd3bf1', '#3d9bf3', '#62b770', '#af2ea2'];

type MultiChanceCubesRewards = {
    readonly [key: string]: ChanceCubesRewardType
}

export const ChanceCubesRewardBuilder = () => {
    const [rewards, setRewards] = useState<MultiChanceCubesRewards>({});

    const setRewardJsonPretty = (json: MultiChanceCubesRewards) => {
        return JSON.stringify(json, undefined, 4);
    };

    const addReward = () => {
        setRewards(old => {
            const newObj = { ...old };
            newObj[`new_reward_${Object.keys(old).length + 1}`] = { chance: 0, isGiantCubeReward: false, dependencies: {} };
            return newObj;
        });
    };

    const removeReward = (rewardId: string) => {
        setRewards(old => {
            const newObj = { ...old };
            delete newObj[rewardId];
            return newObj;
        });
    };

    const setRewardID = (oldId: string, newId: string) => {
        setRewards(old => {
            const newObj = { ...old };
            const rewardJson = newObj[oldId];
            delete newObj[oldId];
            newObj[newId] = rewardJson;
            return newObj;
        });
    };

    const setRewardState = (rewardId: string, json: ChanceCubesRewardType) => {
        setRewards(old => {
            const newObj = { ...old };
            newObj[rewardId] = json;
            return newObj;
        });
    };

    return (
        <>
            <div className='w-25' style={{ position: 'absolute', right: '5px', top: '65px', height: '450px' }} >
                <Headline4>Reward Json</Headline4>
                <TextArea className='code w-100 h-100' value={setRewardJsonPretty(rewards)} readOnly />
            </div>
            <div>
                <h1 className='ml-4 mt-2'>Chance Cubes Reward Builder</h1>
                {
                    Object.keys(rewards).map((reward, i) => {
                        return (<ChanceCubesReward key={i} setRewardID={setRewardID} setRewardState={setRewardState} rewardId={reward} reward={rewards[reward]} color={colors[i % colors.length]} removeReward={() => removeReward(reward)} />);
                    })
                }
                <ContainedButton className='ml-2 mt-2' onClick={() => addReward()}>Add Reward</ContainedButton>
            </div>
        </>
    );
};