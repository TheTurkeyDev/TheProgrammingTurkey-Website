import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLudumDareStats } from '../../network/network';
import { Headline2, Headline4, Loading } from '@theturkeydev/gobble-lib-react';
import { LDEvent } from '../../types/ld-event';
import { ChartProps, ReactChart } from 'chartjs-react';

const catergories = [
    { label: 'Overall', color: '#229954' },
    { label: 'Theme', color: '#e67e22' },
    { label: 'Innovation', color: '#a93226' },
    { label: 'Fun', color: '#f4d03f' },
    { label: 'Graphics', color: '#2e86c1' },
    { label: 'Audio', color: '#7d3c98' },
];

const ChartsWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto auto auto;
    gap: 48px;
    text-align: center;
`;

const getPlace = (cat: string, comps: readonly LDEvent[]) => {
    return comps.map(comp => {
        const place = comp.categories.find(categ => categ.category === cat)?.place ?? -1;
        return place === -1 ? NaN : place;
    });
};

const getStars = (cat: string, comps: readonly LDEvent[]) => {
    return comps.map(comp => {
        const stars = comp.categories.find(categ => categ.category === cat)?.stars ?? -1;
        return stars === -1 ? NaN : stars;
    });
};

const getPercentile = (cat: string, comps: readonly LDEvent[]) => {
    return comps.map(comp => {
        const data = comp.categories.find(categ => categ.category === cat);
        const place = data?.place ?? -1;
        return place === -1 ? NaN : Math.round((1 - (place / comp.games)) * 100);
    });
};

export const LDStats = () => {
    const [loading, setLoading] = useState(true);
    const [comps, setComps] = useState<readonly LDEvent[]>([]);

    useEffect(() => {
        getLudumDareStats().then(json => {
            if (json.success)
                setComps([...json.data].sort((a, b) => a.ld_event_num - b.ld_event_num));
            setLoading(false);
        });
    }, []);

    const labels = comps.map(comp => `LD${comp.ld_event_num} (${comp.games} games)`);

    if (loading)
        return <Loading />;

    return (
        <ChartsWrapper>
            <Headline2>My Ludum Dare Stats</Headline2>
            <ChartGroup
                text='Placement'
                type='line'
                data={{
                    labels: labels,
                    datasets: catergories.map(cat => ({
                        label: cat.label,
                        fill: false,
                        backgroundColor: `${cat.color}7f`,
                        borderColor: `${cat.color}cc`,
                        data: getPlace(cat.label, comps),
                    }))
                }}
                options={{
                    scales: {
                        y: {
                            max: 2250,
                            min: 0,
                            ticks: {
                                stepSize: 100,
                            },
                            reverse: true,
                        },
                    },
                    maintainAspectRatio: false,
                }} />
            <ChartGroup
                text='Category Rating out of 5'
                type='line'
                data={{
                    labels: labels,
                    datasets: catergories.map(cat => ({
                        label: cat.label,
                        fill: false,
                        backgroundColor: `${cat.color}7f`,
                        borderColor: `${cat.color}cc`,
                        data: getStars(cat.label, comps),
                    }))
                }}
                options={{
                    scales: {
                        y: {
                            max: 5,
                            min: 0,
                            ticks: {
                                stepSize: 0.5,
                            }
                        },

                    },
                    maintainAspectRatio: false,
                }}
            />
            <ChartGroup
                text='Percentile Placement Ranks (Higher is Better)'
                type='line'
                data={{
                    labels: labels,
                    datasets: catergories.map(cat => ({
                        label: cat.label,
                        fill: false,
                        backgroundColor: `${cat.color}7f`,
                        borderColor: `${cat.color}cc`,
                        data: getPercentile(cat.label, comps),
                    }))
                }}
                options={{
                    scales: {
                        y:
                        {
                            max: 100,
                            min: 0,
                        },
                    },
                    maintainAspectRatio: false,
                }}
            />
        </ChartsWrapper>
    );
};

const ChartWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 500px;
    margin-bottom: 16px;
`;

type ChartGroupProps = ChartProps & {
    readonly text: string
}
const ChartGroup = ({ text, ...props }: ChartGroupProps) => {
    return (
        <ChartWrapper>
            <Headline4>{text}</Headline4>
            <ReactChart {...props} />
        </ChartWrapper>
    );
};