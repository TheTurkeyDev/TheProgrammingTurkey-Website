import styled from 'styled-components';
import { YahooFantasyPlayerStartingStatus } from '../rest/yahoo-fantasy-player-starting-status';

type YahooFantasyTeamStartingIconProps = {
    readonly startingStatus: YahooFantasyPlayerStartingStatus
}

const StartingIcon = styled.i`
    color: green;
`;

const NotStartingIcon = styled.i`
    color: red;
`;

export const YahooFantasyTeamStartingIcon = ({ startingStatus }: YahooFantasyTeamStartingIconProps) => {
    return (
        startingStatus.isStarting ? <StartingIcon className='far fa-check-circle' /> : <NotStartingIcon className='far fa-times-circle' />
    );
};