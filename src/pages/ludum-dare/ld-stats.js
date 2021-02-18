import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

import { PageWrapper } from '../base/page-wrapper';

/*Overall, Theme, Innovation, Fun, Graphics, Audio*/
const ld27 = {
    display: 'LD27 (1436 games)',
    totalGames: [1436, 0],
    overall: [1142, 2.17],
    theme: [603, 3.13],
    innovation: [931, 2.43],
    fun: [1141, 1.88],
    graphics: [1040, 2.05],
    audio: [0, 0],
};
const ld28 = {
    display: 'LD28 (1281 games)',
    totalGames: [1281, 0],
    overall: [929, 2.39],
    theme: [618, 2.65],
    innovation: [918, 2.11],
    fun: [802, 2.39],
    graphics: [941, 1.89],
    audio: [0, 0],
};
const ld29 = {
    display: 'LD29 (1491 games)',
    totalGames: [1491, 0],
    overall: [1099, 2.56],
    theme: [889, 2.84],
    innovation: [450, 3.21],
    fun: [1063, 2.38],
    graphics: [1231, 1.78],
    audio: [0, 0],
};
const ld30 = {
    display: 'LD30 (1493 games)',
    totalGames: [1493, 0],
    overall: [802, 2.96],
    theme: [546, 3.27],
    innovation: [959, 2.57],
    fun: [642, 2.95],
    graphics: [1135, 2.05],
    audio: [0, 0],
};
const ld31 = {
    display: 'LD31 (1364 games)',
    totalGames: [1364, 0],
    overall: [1025, 2.68],
    theme: [1098, 2.89],
    innovation: [1172, 1.89],
    fun: [1024, 2.47],
    graphics: [854, 2.63],
    audio: [0, 0],
};
const ld32 = {
    display: 'LD32 (1353 games)',
    totalGames: [1353, 0],
    overall: [1006, 2.6],
    theme: [843, 2.95],
    innovation: [1049, 2.16],
    fun: [893, 2.6],
    graphics: [985, 2.24],
    audio: [0, 0],
};
const ld34 = {
    display: 'LD34 (1232 games)',
    totalGames: [1232, 0],
    overall: [923, 2.53],
    theme: [910, 2.76],
    innovation: [718, 2.72],
    fun: [926, 2.18],
    graphics: [886, 1.89],
    audio: [0, 0],
};
const ld35 = {
    display: 'LD35 (1118 games)',
    totalGames: [1118, 0],
    overall: [490, 3.19],
    theme: [339, 3.55],
    innovation: [221, 3.53],
    fun: [392, 3.25],
    graphics: [542, 2.86],
    audio: [443, 2.75],
};
const ld37 = {
    display: 'LD37 (901 games)',
    totalGames: [901, 0],
    overall: [294, 3.32],
    theme: [264, 3.68],
    innovation: [119, 3.68],
    fun: [239, 3.32],
    graphics: [560, 2.26],
    audio: [342, 2.68],
};
const ld39 = {
    display: 'LD39 (988 games)',
    totalGames: [988, 0],
    overall: [410, 3.174],
    theme: [323, 3.522],
    innovation: [170, 3.478],
    fun: [525, 2.739],
    graphics: [474, 2.826],
    audio: [328, 2.81],
};
const ld46 = {
    display: 'LD46 (3576 games)',
    totalGames: [3576, 0],
    overall: [1650, 3.306],
    theme: [1509, 3.528],
    innovation: [1237, 3.278],
    fun: [2078, 2.861],
    graphics: [2039, 2.861],
    audio: [1400, 2.75],
};
const ld47 = {
    display: 'LD47 (800 games)',
    totalGames: [800, 0],
    overall: [482, 3.075],
    theme: [492, 3.105],
    innovation: [557, 2.625],
    fun: [239, 3.425],
    graphics: [551, 2.65],
    audio: [419, 2.658],
};
const comps = [
    ld27,
    ld28,
    ld29,
    ld30,
    ld31,
    ld32,
    ld34,
    ld35,
    ld37,
    ld39,
    ld46,
    ld47,
];

export function LDStats() {
    let statsRef = useRef();
    let percentileRef = useRef();

    useEffect(() => {
        let statsConf = {
            labels: getCategory('display'),
            datasets: [
                {
                    label: 'Overall',
                    fill: false,
                    backgroundColor: 'rgba(34, 153, 84,0.5)',
                    borderColor: 'rgba(34, 153, 84,0.8)',
                    data: getCategory('overall'),
                },
                {
                    label: 'Theme',
                    fill: false,
                    backgroundColor: 'rgba(230, 126, 34,0.5)',
                    borderColor: 'rgba(230, 126, 34,0.8)',
                    data: getCategory('theme'),
                },
                {
                    label: 'Innovation',
                    fill: false,
                    backgroundColor: 'rgba(169, 50, 38,0.5)',
                    borderColor: 'rgba(169, 50, 38,0.8)',
                    data: getCategory('innovation'),
                },
                {
                    label: 'Fun',
                    fill: false,
                    backgroundColor: 'rgba(244, 208, 63,0.5)',
                    borderColor: 'rgba(244, 208, 63,0.8)',
                    data: getCategory('fun'),
                },
                {
                    label: 'Graphics',
                    fill: false,
                    backgroundColor: 'rgba(46, 134, 193,0.5)',
                    borderColor: 'rgba(46, 134, 193,0.8)',
                    data: getCategory('graphics'),
                },
                {
                    label: 'Audio',
                    fill: false,
                    backgroundColor: 'rgba(125, 60, 152,0.5)',
                    borderColor: 'rgba(125, 60, 152,0.8)',
                    data: getCategory('audio'),
                },
            ],
        };

        let percentileConf = {
            labels: getCategory('display'),
            datasets: [
                {
                    label: 'Overall',
                    fill: false,
                    backgroundColor: 'rgba(34, 153, 84,0.5)',
                    borderColor: 'rgba(34, 153, 84,0.8)',
                    data: getPercentile('overall'),
                },
                {
                    label: 'Theme',
                    fill: false,
                    backgroundColor: 'rgba(230, 126, 34,0.5)',
                    borderColor: 'rgba(230, 126, 34,0.8)',
                    data: getPercentile('theme'),
                },
                {
                    label: 'Innovation',
                    fill: false,
                    backgroundColor: 'rgba(169, 50, 38,0.5)',
                    borderColor: 'rgba(169, 50, 38,0.8)',
                    data: getPercentile('innovation'),
                },
                {
                    label: 'Fun',
                    fill: false,
                    backgroundColor: 'rgba(244, 208, 63,0.5)',
                    borderColor: 'rgba(244, 208, 63,0.8)',
                    data: getPercentile('fun'),
                },
                {
                    label: 'Graphics',
                    fill: false,
                    backgroundColor: 'rgba(46, 134, 193,0.5)',
                    borderColor: 'rgba(46, 134, 193,0.8)',
                    data: getPercentile('graphics'),
                },
                {
                    label: 'Audio',
                    fill: false,
                    backgroundColor: 'rgba(125, 60, 152,0.5)',
                    borderColor: 'rgba(125, 60, 152,0.8)',
                    data: getPercentile('audio'),
                },
            ],
        };

        const myChartStats = statsRef.current.getContext('2d');
        new Chart(myChartStats, {
            type: 'line',
            data: statsConf,
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

        const myChartPercent = percentileRef.current.getContext('2d');
        new Chart(myChartPercent, {
            type: 'line',
            data: percentileConf,
        });
    }, []);

    return (
        <PageWrapper>
            <div id="Charts">
                <header>
                    <hgroup className="text-center">
                        <h1>My Ludum Dare Stats</h1>
                    </hgroup>
                </header>
                <div id="LD_Stats" className="text-center">
                    <h2 className="mt-5">
                        {' '}
                        Percentile Placement Ranks (Higher is Better){' '}
                    </h2>
                    <canvas
                        ref={percentileRef}
                        width="1057"
                        height="424"
                        style={{
                            display: 'block',
                            width: '1057px',
                            height: '424px',
                        }}
                    ></canvas>
                    <h2> Category Rating out of 5 </h2>
                    <canvas
                        ref={statsRef}
                        width="1057"
                        height="424"
                        style={{
                            display: 'block',
                            width: '1057px',
                            height: '424px',
                        }}
                    ></canvas>
                </div>
            </div>
        </PageWrapper>
    );
}

function getPercentile(cat) {
    var toReturn = new Array();
    for (var i = 0; i < comps.length; i++) {
        toReturn.push(
            Math.round(
                (1 -
                    (comps[i][cat] == 0
                        ? comps[i]['totalGames'][0]
                        : comps[i][cat][0]) /
                        comps[i]['totalGames'][0]) *
                    100
            )
        );
    }
    return toReturn;
}

function getCategory(cat) {
    var data = [];
    for (var i = 0; i < comps.length; i++)
        if (cat === 'display') data[i] = comps[i][cat];
        else data[i] = comps[i][cat][1];

    return data;
}
