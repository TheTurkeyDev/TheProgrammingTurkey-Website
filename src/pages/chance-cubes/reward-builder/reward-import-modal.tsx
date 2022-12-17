import { Button, ButtonRow, ContainedButton, Input, Modal, OutlinedButton, TextArea, ToggleSwitch } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { MultiChanceCubesRewards } from './multi-chance-cubes-rewards';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns:1fr;
    gap: 8px;
    justify-items: center;
`;

type RewardImportModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly importRewards: (rewards: MultiChanceCubesRewards) => void
}
export const RewardImportModal = ({ show, requestClose, importRewards }: RewardImportModalProps) => {
    const [fileJson, setFileJson] = useState('');
    const [inputJson, setInputJson] = useState('');
    const [inputType, setInputType] = useState(0);

    const create = () => {
        const rewards: MultiChanceCubesRewards = JSON.parse(inputJson);
        importRewards(rewards);
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <ButtonRow>
                    <Button variant={inputType === 0 ? 'contained' : 'outlined'} onClick={() => setInputType(0)}>
                        File
                    </Button>
                    <Button variant={inputType === 1 ? 'contained' : 'outlined'} onClick={() => setInputType(1)}>
                        Text Input
                    </Button>
                </ButtonRow>
                {
                    inputType === 1 &&
                    <TextArea
                        name='rewardJson'
                        label='Reward Json'
                        value={inputJson}
                        onChange={e => setInputJson(e.target.value)}
                        style={{
                            minWidth: '500px',
                            minHeight: '500px'
                        }}
                    />
                }
                <ButtonRow>
                    <OutlinedButton onClick={() => requestClose()}>
                        Cancel
                    </OutlinedButton>
                    <ContainedButton onClick={() => create()}>
                        Import
                    </ContainedButton>
                </ButtonRow>
            </ContentWrapper>
        </Modal>
    );
};