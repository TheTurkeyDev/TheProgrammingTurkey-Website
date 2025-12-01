import { YahooFantasyTeamRoster } from '../../rest/yahoo-fantasy-team-roster';
import { YahooFantasyLeague } from '../../rest/yahoo-fantasy-league';
import { YahooFantasyTeamRosterGridGroup } from './yahoo-fantasy-team-roster-grid-group';
import { Headline5, HorizontalRule } from 'gobble-lib-react';
import { Fragment } from 'react/jsx-runtime';

type YahooFantasyTeamRosterProps = {
    readonly roster: YahooFantasyTeamRoster
    readonly league: YahooFantasyLeague
}

//TODO: Find a list of these?
const GROUP_MAP: { readonly [key: string]: string } = {
    P: 'Players',
    G: 'Goalies',
    O: 'Offense',
    K: 'Kickers',
    DT: 'Defense',
};

export const YahooFantasyTeamRosterGrid = ({ roster, league }: YahooFantasyTeamRosterProps) => {

    const playerGroups = roster.players.reduce((groups, curr) => {
        return new Set([...groups, curr.positionType]);
    }, new Set<string>());

    return (
        <div>
            {
                [...playerGroups].map((g, i) => {
                    const players = roster.players.filter(p => p.positionType === g);
                    return (
                        <Fragment key={g}>
                            {i !== 0 && <HorizontalRule />}
                            <Headline5>{GROUP_MAP[g]}</Headline5>
                            <YahooFantasyTeamRosterGridGroup players={players} statCategories={league.settings.statCategories} posType={g} />
                        </Fragment>
                    );
                })
            }
        </div>
    );
};