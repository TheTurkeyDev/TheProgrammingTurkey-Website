import { Body1, ButtonRow, ContainedButton, Headline2, Headline5, Option, OutlinedButton, Select, TextToast, useFetch, useQuery, useToast } from 'gobble-lib-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDevAPIBase } from '../../../../network/network-helper';
import { getParams, postParams } from '../../../../network/auth-network';
import { GameData } from '../college-football-bowls-prediction-game-data';
import styled from 'styled-components';
import { Fragment, useState } from 'react';
import { PicksData } from '../college-football-bowls-prediction-picks-data';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-items: center;
`;

const GamesList = styled.div`
    max-width: 500px;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 96px 64px 64px 96px min-content;
    align-items: center;
    justify-items: center;
    text-align: center;
    column-gap: 16px;
    row-gap: 4px;
`;

const TeamLogo = styled.img`
    width: 64px;
    height: 64px;

    &:hover {
        cursor: pointer;
        opacity: .5;
    }
`;

export const CFBMyPicks = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { pushToast } = useToast();

    const [games, loadingGames] = useFetch<readonly GameData[]>(`${getDevAPIBase()}/predictions/fbs-bowl/games`, {
        requestData: getParams
    });
    const [myPicks, loadingPicks, { setData }] = useFetch<readonly PicksData[]>(`${getDevAPIBase()}/predictions/fbs-bowl/group/${groupId}/my-picks`, {
        requestData: getParams
    });

    const [savePicks, saving] = useQuery<readonly PicksData[]>(`${getDevAPIBase()}/predictions/fbs-bowl/group/${groupId}/my-picks`, {
        requestData: postParams,
        shouldThrow: true,
    });

    const [dirty, setDirty] = useState(false);

    const onTeamClicked = (gameId: number, teamId: number) => {
        const origPick = myPicks?.find(mp => mp.gameId === gameId);
        setData([
            ...(myPicks?.filter(mp => mp.gameId !== gameId) ?? []),
            {
                ...(origPick ?? {
                    picksId: -1,
                    gameId,
                    pick: teamId,
                    points: -1
                }),
                pick: teamId
            }
        ]);
        setDirty(true);
    };

    const onPointsChange = (gameId: number, points: number) => {
        const origPick = myPicks?.find(mp => mp.gameId === gameId);
        setData([
            ...(myPicks?.filter(mp => mp.gameId !== gameId) ?? []),
            {
                ...(origPick ?? {
                    picksId: -1,
                    gameId,
                    pick: games?.find(g => g.id === gameId)?.homeId!,
                    points: -1
                }),
                points
            }
        ]);
        setDirty(true);
    };

    const onSave = () => {
        if (!myPicks)
            return;
        savePicks(JSON.stringify(myPicks)).then(resp => {
            setData(resp ?? []);
            setDirty(false);
            pushToast(<TextToast text='Picks Saved!' />);
        }).catch(e => {
            pushToast(<TextToast text={e.message} />);
        });
    };

    const pointChoices = Array.from({ length: games?.length ?? 0 })
        .fill(0)
        .map((_, i) => i + 1);

    return (
        <PageWrapper>
            <Headline2>My Picks</Headline2>
            <ButtonRow>
                <OutlinedButton loading={saving} onClick={() => navigate('../', { relative: 'path' })}>Back</OutlinedButton>
                <ContainedButton loading={saving} onClick={onSave}>Save</ContainedButton>
            </ButtonRow>
            <GamesList>
                <div />
                <Headline5>Home</Headline5>
                <Headline5>Away</Headline5>
                <div />
                <Headline5>Points</Headline5>
                {
                    games?.map(g => {
                        const pickData = myPicks?.find(mp => mp.gameId === g.id);
                        const homePicked = !!pickData?.pick && pickData.pick === g.homeId;
                        const awayPicked = !!pickData?.pick && pickData.pick === g.awayId;
                        const homeStyles = { filter: awayPicked ? 'grayscale(0.75)' : '', opacity: awayPicked ? '0.5' : '' };
                        const awayStyles = { filter: homePicked ? 'grayscale(0.75)' : '', opacity: homePicked ? '0.5' : '' };

                        return (
                            <Fragment key={g.id}>
                                <Body1>{g.homeName}</Body1>
                                <TeamLogo src={g.homeLogo} style={homeStyles} onClick={() => onTeamClicked(g.id, g.homeId)} />
                                <TeamLogo src={g.awayLogo} style={awayStyles} onClick={() => onTeamClicked(g.id, g.awayId)} />
                                <Body1>{g.awayName}</Body1>
                                <Select value={pickData?.points ?? 0} onChange={e => onPointsChange(g.id, parseInt(e.target.value))} disabled={!homePicked && !awayPicked}>
                                    <Option value={0}>N/A</Option>
                                    {
                                        pointChoices
                                            .filter(v => (v === pickData?.points ?? 0) || !myPicks?.find(mp => mp.points === v))
                                            .map(p => <Option key={p}>{p}</Option>)
                                    }
                                </Select>
                            </Fragment>
                        );
                    })
                }
            </GamesList>
            <ContainedButton loading={saving} onClick={onSave}>Save</ContainedButton>
        </PageWrapper >
    );
};