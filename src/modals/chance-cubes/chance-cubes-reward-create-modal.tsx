import { ButtonRow, ContainedButton, Input, Modal, OutlinedButton, TextArea, ToggleSwitch, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { getDevAPIBase } from '../../network/network-helper';
import { postParams } from '../../network/auth-network';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns:1fr;
    gap: 8px;
    justify-items: center;
`;

type ChanceCubesRewardCreateModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
}
export const ChanceCubesRewardCreateModal = ({ show, requestClose }: ChanceCubesRewardCreateModalProps) => {

    const [createReward] = useQuery(`${getDevAPIBase()}/chancecubes/rewards`, { requestData: postParams });

    const [rewardName, setRewardName] = useState('');
    const [isGCCReward, setIsGCCReward] = useState(false);
    const [chanceValue, setChanceValue] = useState(0);
    const [description, setDescription] = useState('');

    const create = () => {
        createReward(JSON.stringify({
            name: rewardName,
            chance: chanceValue,
            giantCubeReward: isGCCReward
        }))
            .then(() => requestClose())
            .catch(e => console.log(e.message));
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <Input name='rewardname' label='Reward Name' value={rewardName} onChange={e => setRewardName(e.target.value)} />
                <ToggleSwitch label='Giant Cube Reward' checked={isGCCReward} onClick={() => setIsGCCReward(!isGCCReward)} />
                <TextArea name='description' label='Description' value={description} onChange={e => setDescription(e.target.value)} />
                <Input type='number' name='chanceValue' label='Chance Value' value={chanceValue} min={-100} max={100} onChange={e => setChanceValue(parseInt(e.target.value))} />
                <ButtonRow>
                    <OutlinedButton onClick={() => requestClose()}>
                        Cancel
                    </OutlinedButton>
                    <ContainedButton onClick={() => create()}>
                        Create
                    </ContainedButton>
                </ButtonRow>
            </ContentWrapper>
        </Modal>
    );
};