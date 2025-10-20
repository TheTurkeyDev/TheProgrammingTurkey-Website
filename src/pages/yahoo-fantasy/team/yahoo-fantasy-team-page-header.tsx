import { Body1, Headline4, Icon, OutlinedButton } from 'gobble-lib-react';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { styled } from 'styled-components';
import { useState } from 'react';
import { YahooFantasyStartActiveModal } from './yahoo-fantasy-team-start-active-modal';
import { YahooFantasyLeague } from '../rest/yahoo-fantasy-league';

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

type YahooFantasyTeamPageHeaderProps = {
    readonly team: YahooFantasyTeam
    readonly date: Date
    readonly setDate: (date: Date) => void
    readonly week: number
    readonly setWeek: (week: number | undefined) => void
    readonly gameId: string
    readonly league: YahooFantasyLeague
    readonly teamId: string
}

export const YahooFantasyTeamPageHeader = ({ team, date, setDate, week, setWeek, gameId, league, teamId }: YahooFantasyTeamPageHeaderProps) => {

    const [showStartActiveModal, setShowStartActiveModal] = useState(false);

    const addDay = (count: number) => {
        const nd = new Date(date);
        nd.setDate(date.getDate() + count);
        setDate(nd);
    };

    const addWeek = (count: number) => {
        setWeek(Math.max(week + count, 0));
    };

    return (
        <HeaderWrapper>
            <img src={team.teamLogos[0]?.url} width={64} height={64} />
            <Headline4>{team.name}</Headline4>
            <Spacer />
            <OutlinedButton onClick={() => setShowStartActiveModal(true)}>Start Active Players</OutlinedButton>
            {
                team.roster.coverageType === 'week' &&
                <>
                    <Icon className='fa fa-arrow-left' onClick={() => addWeek(-1)} />
                    <Body1>Week {week}</Body1>
                    <Icon className='fa fa-arrow-right' onClick={() => addWeek(1)} />
                </>
            }
            {
                team.roster.coverageType === 'date' &&
                <>
                    <Icon className='fa fa-arrow-left' onClick={() => addDay(-1)} />
                    <Body1>{date.toLocaleDateString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Body1>
                    <Icon className='fa fa-arrow-right' onClick={() => addDay(1)} />
                </>
            }
            {showStartActiveModal && <YahooFantasyStartActiveModal
                show={showStartActiveModal}
                requestClose={() => setShowStartActiveModal(false)}
                gameId={gameId}
                league={league}
                teamId={teamId}
                date={date}
            />}
        </HeaderWrapper>
    );
};