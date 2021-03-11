import React, { useContext, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import { ConfirmationOverlay } from '../../overlays/confirmation-overlay';
import { AuthPageWrapper } from '../base/auth-page-wrapper';
import { ChanceCubesReward } from './reward-builder/chance-cubes-reward';

export function ChanceCubesRewardBuilder(props) {

    const colors = ['#61a11f', '#445f8b', '#a6142a', '#c1fda1', '#fd3bf1', '#3d9bf3', '#62b770', '#af2ea2'];

    const overlay = useContext(OverlayContext);

    const [rewards, setRewards] = useState({});

    const setRewardJsonPretty = (json) => {
        return JSON.stringify(json, undefined, 4);
    }

    const addReward = () => {
        setRewards(old => {
            const newObj = { ...old };
            newObj[`new_reward_${Object.keys(old).length + 1}`] = { chance: 0, isGiantCubeReward: false, dependencies: {} };
            return newObj;
        })
    }

    const removeReward = (rewardId) => {
        setRewards(old => {
            const newObj = { ...old };
            delete newObj[rewardId];
            return newObj;
        });
    }

    const setRewardID = (oldId, newId) => {
        setRewards(old => {
            const newObj = { ...old };
            const rewardJson = newObj[oldId];
            delete newObj[oldId];
            newObj[newId] = rewardJson;
            return newObj;
        })
    }

    const setRewardState = (rewardId, json) => {
        setRewards(old => {
            const newObj = { ...old };
            newObj[rewardId] = json;
            return newObj;
        })
    }

    const deleteRewardConfirmOverlay = (reward) => {
        overlay.pushCurrentOverlay(<ConfirmationOverlay text={'Are you sure you want to delete this reward?'} options={
            [
                { text: 'Yes', callback: () => { overlay.popCurrentOverlay(); removeReward(reward); } },
                { text: 'No', callback: () => overlay.popCurrentOverlay() }
            ]
        } />);
    }

    return (
        <AuthPageWrapper history={props.history}>
            <div className='w-25' style={{ position: 'absolute', right: '5px', top: '65px', height: '450px' }} >
                <h4>Reward Json</h4>
                <textarea className='code w-100 h-100' value={setRewardJsonPretty(rewards)} readOnly>

                </textarea>
            </div>
            <div>
                <h1 className='ml-4 mt-2'>Chance Cubes Reward Builder</h1>
                {
                    Object.keys(rewards).map((reward, i) => {
                        return (<ChanceCubesReward key={i} setRewardID={setRewardID} setRewardState={setRewardState} rewardId={reward} json={rewards[reward]} color={colors[i % colors.length]} deleteReward={() => deleteRewardConfirmOverlay(reward)} />);
                    })
                }
                <button className='ml-2 mt-2' onClick={() => addReward()}>Add Reward</button>
            </div>
        </AuthPageWrapper >
    )
}