import { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js';

import styled from 'styled-components';
import { LoadingWrapper } from '../base/page-loading';
import { getLudumDareStats } from '../../network/network';

const catergories = [
    {
        label: 'Overall',
        backgroundColor: 'rgba(34, 153, 84,0.5)',
        borderColor: 'rgba(34, 153, 84,0.8)',
    },
    {
        label: 'Theme',
        backgroundColor: 'rgba(230, 126, 34,0.5)',
        borderColor: 'rgba(230, 126, 34,0.8)',
    },
    {
        label: 'Innovation',
        backgroundColor: 'rgba(169, 50, 38,0.5)',
        borderColor: 'rgba(169, 50, 38,0.8)',
    },
    {
        label: 'Fun',
        backgroundColor: 'rgba(244, 208, 63,0.5)',
        borderColor: 'rgba(244, 208, 63,0.8)',
    },
    {
        label: 'Graphics',
        backgroundColor: 'rgba(46, 134, 193,0.5)',
        borderColor: 'rgba(46, 134, 193,0.8)',
    },
    {
        label: 'Audio',
        backgroundColor: 'rgba(125, 60, 152,0.5)',
        borderColor: 'rgba(125, 60, 152,0.8)',
    },
];

const ChartsWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto auto auto;
    gap: 48px;
    text-align: center;
`

const getPlace = (cat, comps) => {
    return comps.map(comp => {
        const place = comp.categories.find(categ => categ.category === cat).place;
        return place === -1 ? comp.games : place;
    });
}

const getStars = (cat, comps) => {
    return comps.map(comp => comp.categories.find(categ => categ.category === cat).stars);
}

const getPercentile = (cat, comps) => {
    return comps.map(comp => {
        const data = comp.categories.find(categ => categ.category === cat);
        return data.place === -1 ? -1 : Math.round((1 - (data.place / comp.games)) * 100);
    });
}


export const LDStats = () => {
    let placeRef = useRef();
    let statsRef = useRef();
    let percentileRef = useRef();

    const [loading, setLoading] = useState(true);
    const [comps, setComps] = useState([]);

    useEffect(() => {
        getLudumDareStats().then(json => {
            if (json.success)
                setComps(json.data.sort((a, b) => a.ld_event_num - b.ld_event_num));
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        if (loading)
            return;
        const labels = comps.map(comp => `LD${comp.ld_event_num} (${comp.games} games)`);

        new Chart(placeRef.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: catergories.map(cat => ({
                    label: cat.label,
                    fill: false,
                    backgroundColor: cat.backgroundColor,
                    borderColor: cat.borderColor,
                    data: getPlace(cat.label, comps),
                }))
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                max: 2250,
                                min: 0,
                                stepSize: 100,
                                reverse: true,
                            },
                        },
                    ],
                },
            },
        });

        new Chart(statsRef.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: catergories.map(cat => ({
                    label: cat.label,
                    fill: false,
                    backgroundColor: cat.backgroundColor,
                    borderColor: cat.borderColor,
                    data: getStars(cat.label, comps),
                }))
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                max: 5,
                                min: 0,
                                stepSize: 0.5,
                            },
                        },
                    ],
                },
            },
        });

        new Chart(percentileRef.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: catergories.map(cat => ({
                    label: cat.label,
                    fill: false,
                    backgroundColor: cat.backgroundColor,
                    borderColor: cat.borderColor,
                    data: getPercentile(cat.label, comps),
                }))
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                max: 100,
                                min: 0,
                            },
                        },
                    ],
                },
            },
        });
    }, [loading, comps, statsRef, percentileRef, placeRef])

    return (
        <LoadingWrapper loading={loading}>
            <ChartsWrapper id='Charts'>
                <h1>My Ludum Dare Stats</h1>
                <ChartGroup text='Placement' refer={placeRef} />
                <ChartGroup text='Category Rating out of 5' refer={statsRef} />
                <ChartGroup text='Percentile Placement Ranks (Higher is Better)' refer={percentileRef} />
            </ChartsWrapper>
        </LoadingWrapper>
    );
}

const ChartCanvas = styled.canvas`
    display: block;
    width: 1057px;
    height: 424px;
    margin-bottom: 16px;
`;

const ChartGroup = ({ text, refer }) => {
    return (
        <div>
            <h2>{text}</h2>
            <ChartCanvas
                ref={refer}
                width='1057'
                height='424'
            />
        </div>
    )
}