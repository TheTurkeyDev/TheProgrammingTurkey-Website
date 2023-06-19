import { Body1, Headline6, Subtitle1 } from 'gobble-lib-react';
import styled from 'styled-components';
import { IconWithPopOver } from '../../../components/pop-over';
import { F1Constructor } from './f1-constructor';
import { F1TeamItem } from './f1-team-item';

const teams: readonly F1Constructor[] = [
    {
        name: 'Mercedes',
        id: 'merc',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/mercedes-logo.png.transform/2col/image.png',
        color: '#6CD3BF',
    },
    {
        name: 'Alpine',
        id: 'alpine',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/alpine-logo.png.transform/2col/image.png',
        color: '#2293D1',
    },
    {
        name: 'Haas F1 Team',
        id: 'haas',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/haas-f1-team-logo.png.transform/2col/image.png',
        color: '#B6BABD',
    },
    {
        name: 'McLaren',
        id: 'mclaren',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/mclaren-logo.png.transform/2col/image.png',
        color: '#F58020',
    },
    {
        name: 'Red Bull Racing',
        id: 'rb',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/red-bull-racing-logo.png.transform/2col/image.png',
        color: '#3671C6',
    },
    {
        name: 'Aston Martin',
        id: 'am',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/aston-martin-logo.png.transform/2col/image.png',
        color: '#358C75',
    },
    {
        name: 'AlphaTauri',
        id: 'at',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/alphatauri-logo.png.transform/2col/image.png',
        color: '#5E8FAA',
    },
    {
        name: 'Ferrari',
        id: 'ferrari',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/ferrari-logo.png.transform/2col/image.png',
        color: '#F91536',
    },
    {
        name: 'Alfa Romeo',
        id: 'ar',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/alfa-romeo-logo.png.transform/2col/image.png',
        color: '#C92D4B',
    },
    {
        name: 'Williams',
        id: 'williams',
        logo: 'https://www.formula1.com/content/dam/fom-website/teams/2023/williams-logo.png.transform/2col/image.png',
        color: '#37BEDD',
    }
];

const liveStandings: { readonly [key: string]: { readonly p: number, readonly tb: number } } = {
    rb: { p: 321, tb: 0 },
    merc: { p: 167, tb: 0 },
    am: { p: 154, tb: 0 },
    ferrari: { p: 122, tb: 0 },
    alpine: { p: 44, tb: 0 },
    mclaren: { p: 17, tb: 0 },
    ar: { p: 9, tb: 0 },
    haas: { p: 8, tb: 0 },
    williams: { p: 7, tb: 0 },
    at: { p: 2, tb: 0 },
};

const picks: { readonly [key: string]: readonly string[] } = {
    'Elite': [
        'rb',
        'merc',
        'ferrari',
        'am',
        'haas',
        'alpine',
        'ar',
        'mclaren',
        'williams',
        'at',
    ],
    'TurkeyDev': [
        'rb',
        'ferrari',
        'merc',
        'am',
        'at',
        'mclaren',
        'haas',
        'alpine',
        'ar',
        'williams',
    ],
    'Snowblade': [
        'rb',
        'ferrari',
        'merc',
        'am',
        'haas',
        'alpine',
        'at',
        'mclaren',
        'ar',
        'williams',
    ],
    'Beesha': [
        'merc',
        'ferrari',
        'rb',
        'am',
        'alpine',
        'mclaren',
        'haas',
        'ar',
        'williams',
        'at',
    ],
    'OrdinaryRock': [
        'ferrari',
        'rb',
        'merc',
        'williams',
        'am',
        'ar',
        'haas',
        'alpine',
        'at',
        'mclaren',
    ],
    'JuiceOSour': [
        'rb',
        'ferrari',
        'alpine',
        'merc',
        'am',
        'haas',
        'mclaren',
        'ar',
        'at',
        'williams',
    ],
    'JRights': [
        'rb',
        'merc',
        'ferrari',
        'am',
        'alpine',
        'haas',
        'mclaren',
        'ar',
        'at',
        'williams',
    ],
    'Brightlylit': [
        'merc',
        'ferrari',
        'rb',
        'mclaren',
        'alpine',
        'am',
        'ar',
        'williams',
        'haas',
        'at',
    ],
    'Trogdor': [
        'ferrari',
        'rb',
        'merc',
        'mclaren',
        'am',
        'williams',
        'haas',
        'alpine',
        'at',
        'ar',
    ]
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(10, auto) 1fr;
    margin: 8px;
    gap: 16px;
`;

const PointsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
`;


const orderedStandings = Object.keys(liveStandings).sort((a, b) => liveStandings[b].p === liveStandings[a].p ? liveStandings[b].tb - liveStandings[a].tb : liveStandings[b].p - liveStandings[a].p);
const calculatePoints = (team: string, index: number) => Math.abs(index - orderedStandings.indexOf(team));

export const F1ConstructorPredictions = () => {

    const calcPoints = Object.fromEntries(Object.entries(picks).map(([k, v]) => [k, Array.from({ length: 10 }, (_, i) => calculatePoints(v[i], i))]));

    const sortedPicks = Object.keys(picks).sort((a, b) => {
        const aPoints = calcPoints[a].reduce((p, c) => p + c, 0);
        const bPoints = calcPoints[b].reduce((p, c) => p + c, 0);
        return aPoints - bPoints;
    });

    console.log(sortedPicks);

    return (
        <Wrapper>
            <Headline6>Live</Headline6>
            {
                sortedPicks.map(k => <Headline6 style={{ textAlign: 'center' }}>{k}</Headline6>)
            }
            <div />
            <PointsWrapper>
                <Headline6>Points</Headline6>
                <IconWithPopOver icon='fas fa-info-circle' direction='right'>
                    <Body1>Lower is better</Body1>
                    <br />
                    <Body1>1 point per position guess is off</Body1>
                </IconWithPopOver>
            </PointsWrapper>
            {
                sortedPicks.map(k => <Headline6 style={{ textAlign: 'center' }}>{calcPoints[k].reduce((prev, curr) => prev + curr, 0)}  </Headline6>)
            }
            <div />
            {
                Array.from({ length: 10 }, (_, i) => (
                    <>
                        <F1TeamItem team={teams.find(c => c.id === orderedStandings[i])!} points={liveStandings[orderedStandings[i]].p} showTeamName={true} />
                        {
                            sortedPicks.map(p => <F1TeamItem team={teams.find(c => c.id === picks[p][i])!} points={calcPoints[p][i]} />)
                        }
                        <div />
                    </>
                ))
            }
        </Wrapper>
    );
};