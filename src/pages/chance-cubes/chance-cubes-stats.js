import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

import { PageWrapper } from '../base/page-wrapper';
import { getChanceCubesStats } from '../../network/chance-cubes-network';

const colors = [
    '#1e90ff',
    '#191970',
    '#9acd32',
    '#ff1493',
    '#00ced1',
    '#db7093',
    '#daa520',
    '#0000ff',
    '#98fb98',
    '#ff00ff',
    '#cd5c5c',
    '#ffa07a',
    '#dda0dd',
    '#800080',
    '#0000cd',
    '#a020f0',
    '#7fffd4',
    '#ffb6c1',
    '#ffd700',
    '#ff0000',
    '#d2691e',
    '#000080',
    '#ff6347',
    '#4682b4',
    '#dc143c',
    '#adff2f',
    '#d2b48c',
    '#ee82ee',
    '#808000',
    '#ff69b4',
    '#9370db',
    '#9932cc',
    '#8fbc8f',
    '#00bfff',
    '#ff8c00',
    '#008080',
    '#32cd32',
    '#f0e68c',
    '#87ceeb',
    '#ffff00',
    '#00ff00',
    '#00fa9a',
    '#708090',
];

var usedColors = [];
var charts = [];

export function ChanceCubesStats() {
    let now = new Date();
    let twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(now.getMonth() - 2);

    const [pageData, setPageData] = useState({
        startDate: twoMonthsAgo,
        endDate: now,
        totalRuns: 0,
        totalDays: 1,
        averageRunsMonth: 0,
        mostRuns: 0,
        mostRunsDay: '1/1/0000',
        mondayAverage: 0,
        tuesdayAverage: 0,
        wednesdayAverage: 0,
        thursdayAverage: 0,
        fridayAverage: 0,
        saturdayAverage: 0,
        sundayAverage: 0,
    });

    const updateMoreStats = (json) => {
        setPageData({
            totalRuns: json['total_runs'],
            totalDays: json['total_days'],
            averageRunsMonth: parseInt(json['total_runs_last_month'] / 30),
            mostRuns: json['most'],
            mostRunsDay: json['most_date'],
            mondayAverage: parseInt(json['daily_totals'][1].total / json['daily_totals'][1].days),
            tuesdayAverage: parseInt(json['daily_totals'][2].total / json['daily_totals'][2].days),
            wednesdayAverage: parseInt(json['daily_totals'][3].total / json['daily_totals'][3].days),
            thursdayAverage: parseInt(json['daily_totals'][4].total / json['daily_totals'][4].days),
            fridayAverage: parseInt(json['daily_totals'][5].total / json['daily_totals'][5].days),
            saturdayAverage: parseInt(json['daily_totals'][6].total / json['daily_totals'][6].days),
            sundayAverage: parseInt(json['daily_totals'][0].total / json['daily_totals'][0].days),
        });
    };

    const versionLineGraphRef = React.createRef();
    const versionPieGraphRef = React.createRef();
    const mcVersionUsageGraphRef = React.createRef();
    const mcVersionPieGraphRef = React.createRef();
    const mcVersionLineGraphRef = React.createRef();
    const runTotalsGraphRef = React.createRef();

    //TODO: Should probably break this into smaller modules
    const updateGraphs = (json) => {
        // Versions Line Graph

        var datasets = [];
        var labels = [];
        var labelColors = [];
        var pieData = [];

        var index = 0;
        var index2 = 0;
        Object.keys(json['versions']).sort(versionCompare).forEach(key => {
            datasets[index] = {
                label: key,
                fill: false,
                backgroundColor: getColorForKey(key),
                borderColor: getColorForKey(key),
                data: json['versions'][key],
            };

            if (json['versions'][key][json['versions'][key].length - 1] != 0) {
                labels[index2] = key;
                labelColors[index2] = getColorForKey(key);
                pieData[index2] = json['versions'][key][json['versions'][key].length - 1];
                index2++;
            }
            index++;
        });

        var ctx = versionLineGraphRef.current.getContext('2d');
        if (charts[0] != null) {
            charts[0].destroy();
        }
        charts[0] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json['dates'],
                datasets: datasets,
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)',
                    },
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: 'rgba(50, 50, 50, 1)',
                                lineWidth: 1,
                            },
                        },
                    ],
                },
            },
        });

        // Versions Pie Graph
        ctx = versionPieGraphRef.current.getContext('2d');
        if (charts[1] != null) {
            charts[1].destroy();
        }
        charts[1] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: pieData,
                        backgroundColor: labelColors,
                    },
                ],
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)',
                    },
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var allData = data.datasets[tooltipItem.datasetIndex].data;
                            var tooltipLabel = data.labels[tooltipItem.index];
                            var tooltipData = parseInt(allData[tooltipItem.index]);
                            var total = 0;
                            for (var i in allData) {
                                total += parseInt(allData[i]);
                            }
                            var tooltipPercentage = Math.round((tooltipData / total) * 100);
                            return `${tooltipLabel}: ${tooltipData} (${tooltipPercentage}%)`;
                        },
                    },
                },
            },
        });

        // MC Versions Line Graph
        datasets = [];
        let percentDataset = [];
        labels = [];
        pieData = [];
        labelColors = [];
        index = 0;

        Object.keys(json['mc_versions']).sort(versionCompare).forEach(key => {
            datasets[index] = {
                label: key,
                fill: false,
                backgroundColor: getColorForKey(key),
                borderColor: getColorForKey(key),
                data: json['mc_versions'][key],
            };

            if (key !== 'All') {
                labels[index] = key;
                labelColors[index] = getColorForKey(key);
                pieData[index] = json['mc_versions'][key][json['mc_versions'][key].length - 1];

                let keyData = [];
                index2 = 0;
                for (var key2 in json['mc_versions'][key]) {
                    keyData[index2] = parseInt(json['mc_versions'][key][key2]) / parseInt(json['mc_versions']['All'][index2]);
                    index2++;
                }

                percentDataset[index] = {
                    label: key,
                    fill: false,
                    backgroundColor: getColorForKey(key),
                    borderColor: getColorForKey(key),
                    data: keyData,
                };
                index++;
            }
        });

        ctx = mcVersionUsageGraphRef.current.getContext('2d');
        if (charts[2] != null) {
            charts[2].destroy();
        }
        charts[2] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json['dates'],
                datasets: datasets,
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)',
                    },
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: 'rgba(50, 50, 50, 1)',
                                lineWidth: 1,
                            },
                        },
                    ],
                },
            },
        });

        ctx = mcVersionLineGraphRef.current.getContext('2d');
        if (charts[5] != null) {
            charts[5].destroy();
        }
        charts[5] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json['dates'],
                datasets: percentDataset,
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)',
                    },
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: 'rgba(50, 50, 50, 1)',
                                lineWidth: 1,
                            },
                        },
                    ],
                },
            },
        });

        // MC Versions Pie Graph
        ctx = mcVersionPieGraphRef.current.getContext('2d');
        if (charts[3] != null) {
            charts[3].destroy();
        }
        charts[3] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: pieData,
                        backgroundColor: labelColors,
                    },
                ],
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)',
                    },
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            var allData = data.datasets[tooltipItem.datasetIndex].data;
                            var tooltipLabel = data.labels[tooltipItem.index];
                            var tooltipData = parseInt(allData[tooltipItem.index]);
                            var total = 0;
                            for (var i in allData) {
                                total += parseInt(allData[i]);
                            }
                            var tooltipPercentage = Math.round((tooltipData / total) * 100);
                            return (`${tooltipLabel}: ${tooltipData} (${tooltipPercentage}%)`);
                        },
                    },
                },
            },
        });

        //Weekly and monthly stats
        datasets = [];
        labels = [];
        labelColors = [];
        index = 0;

        datasets[0] = {
            label: 'Weekly Totals',
            fill: false,
            backgroundColor: '#FF0000',
            borderColor: '#FF0000',
            data: json['weekly_totals'],
        };

        datasets[1] = {
            label: 'Monthly Totals',
            fill: false,
            backgroundColor: '#00FF00',
            borderColor: '#00FF00',
            data: json['monthly_totals'],
        };

        ctx = runTotalsGraphRef.current.getContext('2d');
        if (charts[4] != null) {
            charts[4].destroy();
        }
        charts[4] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json['dates'],
                datasets: datasets,
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)',
                    },
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: 'rgba(50, 50, 50, 1)',
                                lineWidth: 1,
                            },
                        },
                    ],
                },
            },
        });
    };

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0
    var yyyy = today.getFullYear();
    var yearPrior = yyyy;
    var monthPrior = mm - 2;
    if (monthPrior <= 0) {
        monthPrior = 12 + monthPrior;
        yearPrior -= 1;
    }
    if (monthPrior < 10) {
        monthPrior = '0' + monthPrior;
    }
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    let startDay = yearPrior + '-' + monthPrior + '-' + dd;
    today = yyyy + '-' + mm + '-' + dd;

    const [startDate, setStartDate] = useState(startDay);
    const [endDate, setEndDate] = useState(today);

    useEffect(() => {
        getChanceCubesStats(startDate, endDate).then((json) => {
            let versionsToShow = {};
            Object.keys(json.versions).forEach((key) => {
                let usage = json.versions[key];
                let parts = key.split('-');
                let verParts = parts[0].split('.');
                let ver = verParts[0] + '.' + verParts[1];
                if (!versionsToShow[ver]) versionsToShow[ver] = {};

                let runs = parseInt(usage[usage.length - 1]);
                if (runs > 0) {
                    versionsToShow[ver][key] = runs;

                    if (Object.keys(versionsToShow[ver]).length > 3) {
                        removeLowest(versionsToShow[ver], key);
                    }
                }
            });
            let versionsMapped = [];
            Object.keys(versionsToShow).forEach((v) => {
                Object.keys(versionsToShow[v]).forEach((k) => {
                    versionsMapped.push(k);
                });
            });
            Object.keys(json.versions).forEach((v) => {
                if (!versionsMapped.includes(v))
                    delete json.versions[v];
            });
            updateGraphs(json);
            updateMoreStats(json);
        });
    }, [startDate, endDate]);

    return (
        <PageWrapper>
            <div id='charts'>
                <header>
                    <hgroup className='text-center'>
                        <h1>Chance Cubes Version Stats</h1>
                        Start:
                        <input
                            type='date'
                            id='date_start'
                            min='2017-05-05'
                            max={today}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        End:
                        <input
                            type='date'
                            id='date_end'
                            min='2017-05-05'
                            max={today}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </hgroup>
                </header>
                <div id='LD_Stats' className='text-center'>
                    <h2 className='mt-5'> Version usage </h2>
                    <canvas ref={versionLineGraphRef} width='995' height='400'></canvas>
                    <h2 className='mt-5'> Version usage % </h2>
                    <canvas ref={versionPieGraphRef} width='995' height='400'></canvas>
                    <h2 className='mt-5'> MC Version usage</h2>
                    <canvas ref={mcVersionUsageGraphRef} width='995' height='400'></canvas>
                    <h2 className='mt-5'> MC Version usage % </h2>
                    <canvas ref={mcVersionPieGraphRef} width='995' height='400'></canvas>
                    <h2 className='mt-5'> MC Version usage % over Time</h2>
                    <canvas ref={mcVersionLineGraphRef} width='995' height='400'></canvas>
                    <h2 className='mt-5'> Run Totals </h2>
                    <canvas ref={runTotalsGraphRef} width='995' height='400'></canvas>
                    <div className='mt-3'>
                        <div>
                            <p>
                                {`Total Mod Runs: ${numberWithCommas(pageData.totalRuns)} (${numberWithCommas(pageData.totalDays)} days)`}
                            </p>
                        </div>
                        <div>
                            <p>
                                {`Average Daily Mod Runs: ${numberWithCommas(pageData.averageRunsMonth)} (Last 30 days)`}
                            </p>
                        </div>
                        <div>
                            <p>
                                {`Most Single Day Runs: ${numberWithCommas(pageData.mostRuns)} (${pageData.mostRunsDay})`}
                            </p>
                        </div>
                        <p>--- Average runs per day ---</p>
                        <div>
                            <p>
                                {`Monday: ${numberWithCommas(pageData.mondayAverage)}`}
                            </p>
                            <p>
                                {`Tuesday: ${numberWithCommas(pageData.tuesdayAverage)}`}
                            </p>
                            <p>
                                {`Wednesday: ${numberWithCommas(pageData.wednesdayAverage)}`}
                            </p>
                            <p>
                                {`Thursaday: ${numberWithCommas(pageData.thursdayAverage)}`}
                            </p>
                            <p>
                                {`Friday: ${numberWithCommas(pageData.fridayAverage)}`}
                            </p>
                            <p>
                                {`Saturday: ${numberWithCommas(pageData.saturdayAverage)}`}
                            </p>
                            <p>
                                {`Sunday: ${numberWithCommas(pageData.saturdayAverage)}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

function getColorForKey(key) {
    if (usedColors.indexOf(key) == -1) {
        usedColors[usedColors.length] = key;
    }

    let index = usedColors.indexOf(key);
    index = index % colors.length;

    return colors[index];
}

function removeLowest(versionUsage, key) {
    let toRemove = key;
    Object.keys(versionUsage).forEach((v) => {
        if (versionUsage[v] < versionUsage[toRemove]) toRemove = v;
    });
    delete versionUsage[toRemove];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function versionCompare(v1, v2) {
    if (v1 === 'All') {
        return 1;
    }
    else if (v2 === 'All') {
        return -1;
    }
    else if (v1.includes('-')) {
        let v1parts = v1.split('-');
        let v2parts = v2.split('-');
        const comp = versionCompare(v1parts[0], v2parts[0]);
        return comp === 0 ? versionCompare(v1parts[1], v2parts[1]) : comp;
    }

    let v1parts = v1.split('.');
    let v2parts = v2.split('.');

    const isValidPart = (x) => {
        return (/^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);

    for (let i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i)
            return 1;

        if (v1parts[i] == v2parts[i])
            continue;
        else if (v1parts[i] > v2parts[i])
            return 1;
        else
            return -1;
    }

    return v1parts.length != v2parts.length ? -1 : 0;
}