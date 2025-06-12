import { Body1, Headline4, Icon } from 'gobble-lib-react';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { styled } from 'styled-components';

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

type YahooFantasyTeamPageHeaderProps = {
    readonly team: YahooFantasyTeam
    readonly date: Date
    readonly setDate: (date: Date) => void
}

export const YahooFantasyTeamPageHeader = ({ team, date, setDate }: YahooFantasyTeamPageHeaderProps) => {

    const addDay = (count: number) => {
        const nd = new Date(date);
        nd.setDate(date.getDate() + count);
        setDate(nd);
    };

    return (
        <HeaderWrapper>
            <img src={team.teamLogos[0]?.url} width={64} height={64} />
            <Headline4>{team.name}</Headline4>
            <Spacer />
            <Icon className='fa fa-arrow-left' onClick={() => addDay(-1)} />
            <Body1>{date.toLocaleDateString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Body1>
            <Icon className='fa fa-arrow-right' onClick={() => addDay(1)} />
        </HeaderWrapper>
    );
};