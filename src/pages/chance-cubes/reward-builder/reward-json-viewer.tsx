import { Headline4, TextArea } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { MultiChanceCubesRewards } from './multi-chance-cubes-rewards';


const ViewerWrapper = styled.div`
    width: 400px;
    position: absolute;
    right: 15px;
    top: 65px;
    height: 450px;
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
            <TextArea className='code w-100 h-100' value={setRewardJsonPretty(rewards)} readOnly />
        </ViewerWrapper>
    );
};