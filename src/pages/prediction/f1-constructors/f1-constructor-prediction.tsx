import { Headline6 } from 'gobble-lib-react';
import styled from 'styled-components';
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

const liveStandings: { readonly [key: string]: number } = {
    rb: 0,
    ferrari: 0,
    merc: 0,
    alpine: 0,
    mclaren: 0,
    ar: 0,
    am: 0,
    haas: 0,
    at: 0,
    williams: 0,
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
    ]
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 8px;
    gap: 4px;
`;


const orderedStandings = Object.keys(liveStandings).sort((a, b) => liveStandings[b] - liveStandings[a]);
const calculatePoints = (team: string, index: number) => Math.abs(index - orderedStandings.indexOf(team));

export const F1ConstructorPredictions = () => {

    const calcPoints = Object.fromEntries(Object.entries(picks).map(([k, v]) => [k, Array.from({ length: 10 }, (_, i) => calculatePoints(v[i], i))]));

    return (
        <Wrapper>
            <Headline6>Live</Headline6>
            {
                Object.keys(calcPoints).map(k => <Headline6>{k} ({calcPoints[k].reduce((prev, curr) => prev + curr, 0)})</Headline6>)
            }
            {
                Array.from({ length: 10 }, (_, i) => (
                    <>
                        <F1TeamItem team={teams.find(c => c.id === orderedStandings[i])!} points={liveStandings[orderedStandings[i]]} />
                        {
                            Object.keys(picks).map(p => <F1TeamItem team={teams.find(c => c.id === picks[p][i])!} points={calcPoints[p][i]} />)
                        }
                    </>
                ))
            }
        </Wrapper>
    );
};