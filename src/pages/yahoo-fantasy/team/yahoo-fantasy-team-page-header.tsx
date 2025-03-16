import { Headline4 } from 'gobble-lib-react';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { styled } from 'styled-components';

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

type YahooFantasyTeamPageHeaderProps = {
    readonly team: YahooFantasyTeam
}

export const YahooFantasyTeamPageHeader = ({ team }: YahooFantasyTeamPageHeaderProps) => {
    return (
        <HeaderWrapper>
            <img src={team.teamLogos[0]?.url} width={64} height={64} />
            <Headline4>{team.name}</Headline4>
        </HeaderWrapper>
    );
};