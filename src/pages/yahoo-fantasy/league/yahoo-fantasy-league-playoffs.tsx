import { Card, CardContent, CardHeader, Headline5, useFetch } from 'gobble-lib-react';
import { Bracket } from '../../../components/bracket/bracket';
import { YahooFantasyLeague } from '../rest/yahoo-fantasy-league';
import { styled } from 'styled-components';
import { BracketContest } from '../../../components/bracket/bracket-contest';
import { getRoundAndGameNum } from '../../../components/bracket/bracket-context';
import { getDevAPIBase } from '../../../network/network-helper';
import { getParams } from '../../../network/auth-network';
import { useParams } from 'react-router-dom';

type YahooFantasyLeaguePlayoffsProps = {
    readonly league: YahooFantasyLeague
    readonly weeks: string
}

const StyledCard = styled(Card)`
    max-width: 900px;
    width: 100%;
    margin-inline: auto;
`;

export const YahooFantasyLeaguePlayoffs = ({ league, weeks }: YahooFantasyLeaguePlayoffsProps) => {
    const { gameId, leagueId } = useParams();
    const [leaguePlayoffs, loading] = useFetch<YahooFantasyLeague>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${leagueId}/scoreboard?weeks=${weeks}`, { requestData: getParams });


    const numTeams = league.settings.numPlayoffTeams;
    const totalTeams = Math.pow(2, Math.ceil(Math.log2(numTeams)));
    const teams = league.standings.standings.filter(st => st.teamStandings.playoffSeed >= numTeams);
    const paddedTeams = [...teams, ...Array(totalTeams - numTeams).fill(undefined)];
    const numRounds = numTeams > 0 ? Math.ceil(Math.log2(numTeams)) - 1 : 0;

    const contests = Array.from({ length: totalTeams - 1 }, (_, i) => i).map(v => {
        const [round, gameNum] = getRoundAndGameNum(v, totalTeams);
        const contest: BracketContest = {
            bracketGameId: `r${round}g${gameNum}`,
            isSeries: false,
            top: {
                score: 0,
                position: 0,
                isHome: false,
                isWinner: false,
                rank: '',
                type: 'TEAM',
                team: {
                    id: '-1',
                    logo: '',
                    name: `Test ${v}`,
                    nameShort: `Test ${v}`,
                    abbr: '',
                    primaryColor: '',
                    secondaryColor: ''
                }
            },
            bot: {
                score: 0,
                position: 0,
                isHome: false,
                isWinner: false,
                rank: '',
                type: 'TEAM',
                team: {
                    id: '-2',
                    logo: '',
                    name: `Test ${v + 1}`,
                    nameShort: `Test ${v + 1}`,
                    abbr: '',
                    primaryColor: '',
                    secondaryColor: ''
                }
            }
        };
        return contest;
    });

    console.log(league);

    return (
        <StyledCard>
            <CardHeader>
                <Headline5>Playoffs</Headline5>
            </CardHeader>
            <CardContent>
                <Bracket numTeams={totalTeams} contests={contests} picks={[]} isTwoSided={false} />
            </CardContent>
        </StyledCard>
    );
};