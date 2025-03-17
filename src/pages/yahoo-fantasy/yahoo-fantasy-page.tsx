import { Body1, Card, CardContent, CardHeader, Headline3, Headline4, HorizontalRule, useFetch } from 'gobble-lib-react';
import { getDevAPIBase } from '../../network/network-helper';
import styled from 'styled-components';
import { YahooFantasyFullUser } from './rest/yahoo-fantasy-full-user';
import { useNavigate } from 'react-router-dom';
import { getParams } from '../../network/auth-network';

const PageContent = styled.div`
    margin: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const YahooFantasyPage = () => {

    const navigate = useNavigate();
    const [user] = useFetch<YahooFantasyFullUser>(`${getDevAPIBase()}/yahoo/me`, { requestData: getParams });

    return (
        <PageContent>
            {
                user?.games.filter(g => !g.isGameOver).map(g => (
                    <Card>
                        <CardHeader>
                            <Headline4>{g.name}</Headline4>
                        </CardHeader>
                        <CardContent>
                            {
                                g.leagues.map(l => (
                                    l.teams.map(t => (
                                        <Body1 onClick={() => navigate(`game/${g.gameId}/league/${l.leagueId}/team/${t.teamId}`)}>{l.name} | {t.name}</Body1>
                                    ))
                                ))
                            }
                        </CardContent>
                    </Card>
                ))
            }
            <HorizontalRule />
            <Headline3>Past Teams</Headline3>
            {
                user?.games.filter(g => g.isGameOver).map(g => (
                    <Card>
                        <CardHeader>
                            <Headline4>{g.name}</Headline4>
                        </CardHeader>
                        <CardContent>
                            {
                                g.leagues.map(l => (
                                    l.teams.map(t => (
                                        `${l.name} | ${t.name}`
                                    ))
                                ))
                            }
                        </CardContent>
                    </Card>
                ))
            }
        </PageContent>
    );
};