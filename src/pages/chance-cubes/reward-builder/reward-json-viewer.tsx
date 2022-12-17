import { Headline4, TextArea } from 'gobble-lib-react';
import styled from 'styled-components';
import { MultiChanceCubesRewards } from './multi-chance-cubes-rewards';

const ViewerWrapper = styled.div`
    width: 400px;
    position: absolute;
    right: 15px;
    top: 65px;
    height: 450px;
`;

const Code = styled(TextArea)`
    width: 100%;
    height: 100%;
    background-color: #121212 !important;
    color: #cc11cc;
    margin-top: 3px;
`;

type RewardJsonViewerProps = {
    readonly rewards: MultiChanceCubesRewards
}

export const RewardJsonViewer = ({ rewards }: RewardJsonViewerProps) => {
    const setRewardJsonPretty = (json: MultiChanceCubesRewards) => {
        return JSON.stringify(json, undefined, 4);
    };

    return (
        <ViewerWrapper>
            <Headline4>Reward Json</Headline4>
            <Code value={setRewardJsonPretty(rewards)} readOnly />
        </ViewerWrapper>
    );
};