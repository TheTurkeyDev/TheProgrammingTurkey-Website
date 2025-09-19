import { YahooFantasyTeamRoster } from '../../rest/yahoo-fantasy-team-roster';
import { YahooFantasyLeague } from '../../rest/yahoo-fantasy-league';
import { YahooFantasyTeamRosterGridHockey } from './yahoo-fantasy-team-roster-grid-hockey';
import { YahooFantasyTeamRosterGridFootball } from './yahoo-fantasy-team-roster-grid-football';

type YahooFantasyTeamRosterProps = {
    readonly roster: YahooFantasyTeamRoster
    readonly league: YahooFantasyLeague
}

export const YahooFantasyTeamRosterGrid = ({ roster, league }: YahooFantasyTeamRosterProps) => {
    switch (league.gameCode) {
        case 'nhl':
            return <YahooFantasyTeamRosterGridHockey roster={roster} />;
        case 'nfl':
            return <YahooFantasyTeamRosterGridFootball roster={roster} />;
    }
};