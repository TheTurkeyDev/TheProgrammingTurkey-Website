import { Card, CardContent, CardHeader, Headline3, Headline4, HorizontalRule, useFetch } from 'gobble-lib-react';
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

const LeagueTeamWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    gap: 8px;
`;

const TeamWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #88888822;
        cursor: pointer;
    }
`;

const VertLine = styled.div`
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.background.on};
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
                                        <LeagueTeamWrapper>
                                            <TeamWrapper onClick={() => navigate(`game/${g.gameId}/league/${l.leagueId}/team/${t.teamId}`)}>
                                                <img src={t.teamLogos[0].url} width={64} />
                                                <Headline4>{t.name}</Headline4>
                                            </TeamWrapper>
                                            <VertLine />
                                            <TeamWrapper onClick={() => navigate(`game/${g.gameId}/league/${l.leagueId}`)}>
                                                <img src={l.logoURL} width={64} />
                                                <Headline4>{l.name}</Headline4>
                                            </TeamWrapper>
                                        </LeagueTeamWrapper>
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
                                        <LeagueTeamWrapper>
                                            <TeamWrapper onClick={() => navigate(`game/${g.gameId}/league/${l.leagueId}/team/${t.teamId}`)}>
                                                <img src={t.teamLogos[0].url} width={64} />
                                                <Headline4>{t.name}</Headline4>
                                            </TeamWrapper>
                                            <VertLine />
                                            <TeamWrapper onClick={() => navigate(`game/${g.gameId}/league/${l.leagueId}`)}>
                                                <img src={l.logoURL} width={64} />
                                                <Headline4>{l.name}</Headline4>
                                            </TeamWrapper>
                                        </LeagueTeamWrapper>
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