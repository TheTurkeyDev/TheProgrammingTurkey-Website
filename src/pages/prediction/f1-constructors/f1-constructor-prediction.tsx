import { Body1, Caption, Headline2, Loading, useFetch } from 'gobble-lib-react';
import styled from 'styled-components';
import { F1Constructor } from './f1-constructor';
import { getDevAPIBase } from '../../../network/network-helper';
import { useParams } from 'react-router-dom';
import { getGetAuthParams } from '../../../network/auth-network';
import { Fragment, useEffect, useState } from 'react';
import { F1ConstructorStanding } from './f1-constructor-standing';
import { F1ConstructorPicks } from './f1-constructor-picks';

const ResultsTable = styled.div`
    width: min-content;
    display: grid;
    grid-template-columns: auto auto 64px repeat(10, 64px);
    column-gap: 8px;
    padding-left: 16px;
    margin-inline: auto;
`;

const ConstructorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const PickWrapper = styled.div`
    position: relative;
`;

const PointWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    background: #000000d7;
    width: 18px;
    height: 18px;
    display: grid;
    align-items: center;
    justify-items: center;
    line-height: 1em;
`;

const LineText = styled(Body1)`
    font-size: 20px;
    align-self: center;
`;

export const F1ConstructorPredictions = () => {
    const { year } = useParams();
    const [teams, loadingTeams] = useFetch<readonly F1Constructor[]>(`${getDevAPIBase()}/predictions/f1/${year}/constructor/constructors`, { requestData: getGetAuthParams(), skip: !year });
    const [liveStandings, loadingStandings] = useFetch<readonly F1ConstructorStanding[]>(`${getDevAPIBase()}/predictions/f1/${year}/constructor/standings`, { requestData: getGetAuthParams(), skip: !year });
    const [picks, loadingPicks] = useFetch<readonly F1ConstructorPicks[]>(`${getDevAPIBase()}/predictions/f1/${year}/constructor/picks`, { requestData: getGetAuthParams(), skip: !year });

    const [orderedStandings, setOrderedStandings] = useState<readonly F1ConstructorStanding[]>([]);
    const [calcPoints, setCalcPoints] = useState<{ readonly [k: string]: readonly number[] }>({});
    const [sortedPicks, setSortedPicks] = useState<readonly F1ConstructorPicks[]>([]);

    useEffect(() => {
        if (!liveStandings) return;

        setOrderedStandings([...liveStandings].sort((a, b) => a.points === b.points ? a.tieBreak - b.tieBreak : b.points - a.points));
    }, [liveStandings]);

    useEffect(() => {
        if (!picks || !orderedStandings) return;

        const cp = [...picks].reduce((prev, pick) => ({
            ...prev,
            [pick.userId]: Array.from({ length: 10 }, (_, i) => Math.abs(i - orderedStandings.findIndex(t => t.constId === pick.picks[i])))
        }), {} as { readonly [k: string]: readonly number[] });

        setCalcPoints(cp);
        setSortedPicks([...picks].sort((a, b) => {
            const aPoints = cp[a.userId].reduce((p, c) => p + c, 0);
            const bPoints = cp[b.userId].reduce((p, c) => p + c, 0);

            if (aPoints !== bPoints)
                return aPoints - bPoints;

            const aExact = cp[a.userId].reduce((p, c) => c === 0 ? p + 1 : p, 0);
            const bExact = cp[b.userId].reduce((p, c) => c === 0 ? p + 1 : p, 0);

            return bExact - aExact;
        }));

    }, [picks, orderedStandings]);

    if (loadingTeams || loadingStandings || loadingPicks)
        return <Loading />;

    if (!liveStandings || !picks)
        return <Body1>This year isn't supported yet!</Body1>;

    return (
        <div>
            <Headline2>F1 {year} Constructors Prediction</Headline2>
            <ResultsTable>
                <span></span>
                <span></span>
                <span style={{ alignSelf: 'end' }}>
                    Points
                </span>
                {
                    orderedStandings.map(t => {
                        const team = teams?.find(c => c.id === t.constId);
                        return (
                            <ConstructorWrapper key={t.constId}>
                                <img width={64} src={team?.logo} />
                                <Body1 style={{ fontSize: (team?.nameShort.length ?? 0) < 12 ? '' : '10px' }}>{team?.nameShort}</Body1>
                                <Body1 style={{ fontSize: '28px' }}>{t.points}</Body1>
                            </ ConstructorWrapper>
                        );
                    })
                }
                {
                    sortedPicks.map((p, place) => {
                        return (
                            <Fragment key={p.userId}>
                                <LineText>{place + 1}</LineText>
                                <LineText>{p.userId}</LineText>
                                <LineText style={{ justifySelf: 'center' }}>{calcPoints[p.userId].reduce((prev, curr) => prev + curr, 0)}</LineText>
                                {
                                    Array.from({ length: 10 }, (_, i) => (
                                        <PickWrapper key={`${p}-${i}`}>
                                            <img width={64} src={teams?.find(c => c.id === p.picks[i])?.logo} />
                                            <PointWrapper>
                                                <Caption>
                                                    {calcPoints[p.userId][i]}
                                                </Caption>
                                            </PointWrapper>
                                        </PickWrapper>
                                    ))
                                }
                            </Fragment>
                        );
                    })
                }
            </ResultsTable>
        </div>
    );
};