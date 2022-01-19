import { useState } from 'react';
import styled from 'styled-components';
import { useOverlay } from '../../contexts/overlay-context';
import { createReward } from '../../network/chance-cubes-network';

const InputsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    align-items: center;

    &>label{
       text-align: end;
    }
`;

export const ChanceCubesRewardCreateOverlay = () => {
    const { popCurrentOverlay } = useOverlay();

    const [rewardName, setRewardName] = useState('');
    const [isGCCReward, setIsGCCReward] = useState(false);
    const [chanceValue, setChanceValue] = useState(0);
    const [description, setDescription] = useState('');

    const create = () => {
        createReward(rewardName, chanceValue, isGCCReward).then(json => {
            if (json.success) {
                popCurrentOverlay();
            }
            else {
                console.log(json.message);
            }
        })
    }

    return (
        <>
            <InputsWrapper>
                <label>Reward Name</label>
                <input type='text' value={rewardName} onChange={e => setRewardName(e.target.value)} />
                <label>Giant Cube Reward</label>
                <input type='checkbox' checked={isGCCReward} onChange={e => setIsGCCReward(e.target.checked)} />
                <label>Chance Value</label>
                <input type='number' value={chanceValue} min={-100} max={100} onChange={e => setChanceValue(e.target.value)} />
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </InputsWrapper>
            <hr />
            <button onClick={() => create()}>
                Create
            </button>
        </>
    );
}