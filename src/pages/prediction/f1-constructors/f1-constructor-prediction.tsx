import { Body1, Caption, Headline2, Loading, useFetch } from 'gobble-lib-react';
import styled from 'styled-components';
import { F1Constructor } from './f1-constructor';
import { getDevAPIBase } from '../../../network/network-helper';
import { useParams } from 'react-router-dom';
import { getGetAuthParams } from '../../../network/auth-network';
import { Fragment, useEffect, useState } from 'react';
import { IconWithPopOver } from '../../../components/pop-over';

const ResultsTable = styled.div`
    width: min-content;
    display: grid;
    grid-template-columns: auto auto 64px repeat(10, 48px);
    gap: 8px;
    padding-left: 16px;
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
    const [liveStandings, loadingStandings] = useFetch<{ readonly [key: string]: { readonly p: number, readonly tb: number } }>(`${getDevAPIBase()}/predictions/f1/${year}/constructor/standings`, { requestData: getGetAuthParams(), skip: !year });
    const [picks, loadingPicks] = useFetch<{ readonly [key: string]: readonly string[] }>(`${getDevAPIBase()}/predictions/f1/${year}/constructor/picks`, { requestData: getGetAuthParams(), skip: !year });

    const [orderedStandings, setOrderedStandings] = useState<readonly string[]>([]);
    const [calcPoints, setCalcPoints] = useState<{ readonly [k: string]: readonly number[] }>({});
    const [sortedPicks, setSortedPicks] = useState<readonly string[]>([]);

    useEffect(() => {
        if (!liveStandings) return;

        setOrderedStandings(Object.keys(liveStandings).sort((a, b) => liveStandings[b].p === liveStandings[a].p ? liveStandings[b].tb - liveStandings[a].tb : liveStandings[b].p - liveStandings[a].p));
    }, [liveStandings]);

    useEffect(() => {
        if (!picks) return;

        const cp = Object.fromEntries(
            Object.entries(picks)
                .map(([k, v]) => [k, Array.from({ length: 10 }, (_, i) => Math.abs(i - orderedStandings.indexOf(v[i])))])
        );

        setCalcPoints(cp);
        setSortedPicks(Object.keys(picks).sort((a, b) => {
            const aPoints = cp[a].reduce((p, c) => p + c, 0);
            const bPoints = cp[b].reduce((p, c) => p + c, 0);

            if (aPoints !== bPoints)
                return aPoints - bPoints;

            const aExact = cp[a].reduce((p, c) => c === 0 ? p + 1 : p, 0);
            const bExact = cp[b].reduce((p, c) => c === 0 ? p + 1 : p, 0);

            return bExact - aExact;
        }));

    }, [picks]);

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
                    orderedStandings.map((e, i) => {
                        const team = teams?.find(c => c.id === orderedStandings[i]);
                        return (
                            <ConstructorWrapper key={e}>
                                <img width={48} src={team?.logo} />
                                <span>{liveStandings[e].p}</span>
                            </ ConstructorWrapper>
                        );
                    })
                }
                {
                    sortedPicks.map((p, place) => {
                        return (
                            <Fragment key={p}>
                                <LineText>{place + 1}</LineText>
                                <LineText>{p}</LineText>
                                <LineText style={{ justifySelf: 'center' }}>{calcPoints[p].reduce((prev, curr) => prev + curr, 0)}</LineText>
                                {
                                    Array.from({ length: 10 }, (_, i) => (
                                        <PickWrapper key={`${p}-${i}`}>
                                            <img width={48} src={teams?.find(c => c.id === picks[p][i])?.logo} />
                                            <PointWrapper>
                                                <Caption>
                                                    {calcPoints[p][i]}
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