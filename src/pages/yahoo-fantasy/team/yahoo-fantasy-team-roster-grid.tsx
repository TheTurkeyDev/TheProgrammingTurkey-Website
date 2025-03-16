import { Table, TD, TH } from 'gobble-lib-react';
import { YahooFantasyTeamRoster } from '../rest/yahoo-fantasy-team-roster';

type YahooFantasyTeamRosterProps = {
    readonly roster: YahooFantasyTeamRoster
}

export const YahooFantasyTeamRosterGrid = ({ roster }: YahooFantasyTeamRosterProps) => {
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <TH>Pos</TH>
                        <TH>Player</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        roster.players.map(p => {

                            return (
                                <tr>
                                    <TD>{p.selectedPosition.position}</TD>
                                    <TD>{p.name.full}</TD>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};