import { Body1, Caption, Headline2, Loading, useFetch } from 'gobble-lib-react';
import styled from 'styled-components';
import { getDevAPIBase } from '../../../network/network-helper';
import { useParams } from 'react-router-dom';
import { getGetAuthParams } from '../../../network/auth-network';
import { Fragment, useEffect, useState } from 'react';
import { F1Driver } from './f1-driver';
import { F1DriverStanding } from './f1-driver-standing';
import { F1DriverPicks } from './f1-driver-picks';
import { F1DriverItem } from './f1-driver-item';

const ResultsTable = styled.div`
    width: min-content;
    display: grid;
    grid-template-columns: auto auto 64px repeat(20, 64px);
    column-gap: 8px;
    row-gap: 2px;
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

export const F1DriverPredictions = () => {
    const { year } = useParams();
    const [drivers, loadingTeams] = useFetch<readonly F1Driver[]>(`${getDevAPIBase()}/predictions/f1/${year}/driver/drivers`, { requestData: getGetAuthParams(), skip: !year });
    const [liveStandings, loadingStandings] = useFetch<readonly F1DriverStanding[]>(`${getDevAPIBase()}/predictions/f1/${year}/driver/standings`, { requestData: getGetAuthParams(), skip: !year });
    const [picks, loadingPicks] = useFetch<readonly F1DriverPicks[]>(`${getDevAPIBase()}/predictions/f1/${year}/driver/picks`, { requestData: getGetAuthParams(), skip: !year });

    const [orderedStandings, setOrderedStandings] = useState<readonly F1DriverStanding[]>([]);
    const [calcPoints, setCalcPoints] = useState<{ readonly [k: string]: readonly number[] }>({});
    const [sortedPicks, setSortedPicks] = useState<readonly F1DriverPicks[]>([]);

    useEffect(() => {
        if (!liveStandings) return;

        setOrderedStandings([...liveStandings].sort((a, b) => a.points === b.points ? a.tieBreak - b.tieBreak : b.points - a.points));
    }, [liveStandings]);

    useEffect(() => {
        if (!picks || !orderedStandings) return;

        const cp = [...picks].reduce((prev, pick) => ({
            ...prev,
            [pick.userId]: Array.from({ length: 20 }, (_, i) => Math.abs(i - orderedStandings.findIndex(t => t.driverId === pick.picks[i])))
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
                        const driver = drivers?.find(c => c.id === t.driverId);
                        return (
                            <ConstructorWrapper key={t.driverId}>
                                {driver && <F1DriverItem driver={driver} />}
                                <span>{t.points}</span>
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
                                    Array.from({ length: 20 }, (_, i) => (
                                        <PickWrapper key={`${p}-${i}`}>
                                            <img width={64} src={drivers?.find(c => c.id === p.picks[i])?.image} />
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