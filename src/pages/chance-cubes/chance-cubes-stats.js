import React, { Component, useEffect, useState } from "react";
import Chart from "chart.js";

import { PageWrapper } from "../base/page-wrapper";

const colors = ["#1e90ff", "#191970", "#9acd32", "#ff1493", "#00ced1", "#db7093",
    "#daa520", "#0000ff", "#98fb98", "#ff00ff", "#cd5c5c", "#ffa07a", "#dda0dd",
    "#800080", "#0000cd", "#a020f0", "#7fffd4", "#ffb6c1", "#ffd700", "#ff0000",
    "#d2691e", "#000080", "#ff6347", "#4682b4", "#dc143c", "#adff2f", "#d2b48c",
    "#ee82ee", "#808000", "#ff69b4", "#9370db", "#9932cc", "#8fbc8f", "#00bfff",
    "#ff8c00", "#008080", "#32cd32", "#f0e68c", "#87ceeb", "#ffff00", "#00ff00",
    "#00fa9a", "#708090"];

var usedColors = [];
var charts = [];

export function ChanceCubesStats(props) {

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
        mostRunsDay: "1/1/0000",
        mondayAverage: 0,
        tuesdayAverage: 0,
        wednesdayAverage: 0,
        thursdayAverage: 0,
        fridayAverage: 0,
        saturdayAverage: 0,
        sundayAverage: 0
    });

    const updateMoreStats = (json) => {
        setPageData({
            totalRuns: json["Total Runs"],
            totalDays: json["Total Days"],
            averageRunsMonth: parseInt(json["Total Runs Last Month"] / 30),
            mostRuns: json["Most"],
            mostRunsDay: json["Most Date"],
            mondayAverage: parseInt(json["DailyTotals"][3] / json["DailyTotals"][10]),
            tuesdayAverage: parseInt(json["DailyTotals"][4] / json["DailyTotals"][11]),
            wednesdayAverage: parseInt(json["DailyTotals"][5] / json["DailyTotals"][12]),
            thursdayAverage: parseInt(json["DailyTotals"][6] / json["DailyTotals"][13]),
            fridayAverage: parseInt(json["DailyTotals"][0] / json["DailyTotals"][7]),
            saturdayAverage: parseInt(json["DailyTotals"][1] / json["DailyTotals"][8]),
            sundayAverage: parseInt(json["DailyTotals"][2] / json["DailyTotals"][9])
        });
    }

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
        for (var key in json["Versions"]) {
            datasets[index] = {
                label: key,
                fill: false,
                backgroundColor: getColorForKey(key),
                borderColor: getColorForKey(key),
                data: json["Versions"][key]
            }

            if (json["Versions"][key][json["Versions"][key].length - 1] != 0) {
                labels[index2] = key;
                labelColors[index2] = getColorForKey(key);
                pieData[index2] = json["Versions"][key][json["Versions"][key].length - 1];
                index2++;
            }
            index++;
        }

        var ctx = versionLineGraphRef.current.getContext("2d");
        if (charts[0] != null) {
            charts[0].destroy();
        }
        charts[0] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json["Dates"],
                datasets: datasets
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)'
                    }
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(50, 50, 50, 1)',
                            lineWidth: 1
                        }
                    }]
                }
            }
        });

        // Versions Pie Graph
        var ctx = versionPieGraphRef.current.getContext("2d");
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
                        backgroundColor: labelColors
                    }
                ]
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)'
                    }
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
                            return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                        }
                    }
                }
            }
        });

        // MC Versions Line Graph
        datasets = [];
        let percentDataset = [];
        labels = [];
        pieData = [];
        labelColors = [];
        index = 0;

        for (var key in json["MC Versions"]) {
            datasets[index] = {
                label: key,
                fill: false,
                backgroundColor: getColorForKey(key),
                borderColor: getColorForKey(key),
                data: json["MC Versions"][key]
            }

            if (!(key === "All")) {
                labels[index] = key;
                labelColors[index] = getColorForKey(key);
                pieData[index] = json["MC Versions"][key][json["MC Versions"][key].length - 1];

                let keyData = [];
                index2 = 0;
                for (var key2 in json["MC Versions"][key]) {
                    keyData[index2] = parseInt(json["MC Versions"][key][key2]) / parseInt(json["MC Versions"]["All"][index2]);
                    index2++;
                }

                percentDataset[index] = {
                    label: key,
                    fill: false,
                    backgroundColor: getColorForKey(key),
                    borderColor: getColorForKey(key),
                    data: keyData
                }

                index++;
            }
        }

        var ctx = mcVersionUsageGraphRef.current.getContext("2d");
        if (charts[2] != null) {
            charts[2].destroy();
        }
        charts[2] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json["Dates"],
                datasets: datasets
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)'
                    }
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(50, 50, 50, 1)',
                            lineWidth: 1
                        }
                    }]
                }
            }
        });

        var ctx = mcVersionLineGraphRef.current.getContext("2d");
        if (charts[5] != null) {
            charts[5].destroy();
        }
        charts[5] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json["Dates"],
                datasets: percentDataset
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)'
                    }
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(50, 50, 50, 1)',
                            lineWidth: 1
                        }
                    }]
                }
            }
        });

        // MC Versions Pie Graph
        var ctx = mcVersionPieGraphRef.current.getContext("2d");
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
                        backgroundColor: labelColors
                    }
                ]
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)'
                    }
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
                            return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                        }
                    }
                }
            }
        });


        //Weekly and monthly stats
        datasets = [];
        labels = [];
        labelColors = [];
        index = 0;

        datasets[0] = {
            label: "Weekly Totals",
            fill: false,
            backgroundColor: "#FF0000",
            borderColor: "#FF0000",
            data: json["WeeklyTotals"]
        }

        datasets[1] = {
            label: "Monthly Totals",
            fill: false,
            backgroundColor: "#00FF00",
            borderColor: "#00FF00",
            data: json["MonthlyTotals"]
        }

        var ctx = runTotalsGraphRef.current.getContext("2d");
        if (charts[4] != null) {
            charts[4].destroy();
        }
        charts[4] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: json["Dates"],
                datasets: datasets
            },
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(217, 217, 217)'
                    }
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(50, 50, 50, 1)',
                            lineWidth: 1
                        }
                    }]
                }
            }
        });
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0
    var yyyy = today.getFullYear();
    var yearPrior = yyyy;
    var monthPrior = mm - 2;
    if (monthPrior <= 0) {
        monthPrior = (12 + monthPrior);
        yearPrior -= 1;
    }
    if (monthPrior < 10) {
        monthPrior = '0' + monthPrior
    }
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    let startDay = yearPrior + '-' + monthPrior + '-' + dd;
    today = yyyy + '-' + mm + '-' + dd;

    const [startDate, setStartDate] = useState(startDay);
    const [endDate, setEndDate] = useState(today);

    useEffect(() => {
        fetch(`https://api.theprogrammingturkey.com/chance_cubes/ChanceCubesStats.php?Start=${startDate}&End=${endDate}`).then(response =>
            response.json()
        ).then((json) => {
            let versionsToShow = {}
            Object.keys(json.Versions).forEach(key => {
                let usage = json.Versions[key];
                let parts = key.split("-");
                let verParts = parts[0].split(".");
                let ver = verParts[0] + "." + verParts[1];
                if (!versionsToShow[ver])
                    versionsToShow[ver] = {};

                let runs = parseInt(usage[usage.length - 1]);
                if (runs > 0) {
                    versionsToShow[ver][key] = runs;

                    if (Object.keys(versionsToShow[ver]).length > 3) {
                        removeLowest(versionsToShow[ver], key)
                    }
                }
            });
            let versionsMapped = [];
            Object.keys(versionsToShow).forEach(v => {
                Object.keys(versionsToShow[v]).forEach(k => {
                    versionsMapped.push(k);
                });
            });
            Object.keys(json.Versions).forEach(v => {
                if (!versionsMapped.includes(v))
                    delete json.Versions[v];
            });
            updateGraphs(json);
            updateMoreStats(json);
        });
    }, [startDate, endDate]);

    return (
        <PageWrapper >
            <div id="charts">
                <header>
                    <hgroup className="text-center">
                        <h1>Chance Cubes Version Stats</h1>
                    Start:
                        <input type="date" id="date_start" min="2017-05-05" max={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    End:
                        <input type="date" id="date_end" min="2017-05-05" max={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </hgroup>
                </header>
                <div id="LD_Stats" className="text-center">
                    <h2 className="mt-5"> Version usage </h2>
                    <canvas ref={versionLineGraphRef} width="995" height="400"></canvas>
                    <h2 className="mt-5"> Version usage % </h2>
                    <canvas ref={versionPieGraphRef} width="995" height="400"></canvas>
                    <h2 className="mt-5"> MC Version usage</h2>
                    <canvas ref={mcVersionUsageGraphRef} width="995" height="400"></canvas>
                    <h2 className="mt-5"> MC Version usage % </h2>
                    <canvas ref={mcVersionPieGraphRef} width="995" height="400"></canvas>
                    <h2 className="mt-5"> MC Version usage % over Time</h2>
                    <canvas ref={mcVersionLineGraphRef} width="995" height="400"></canvas>
                    <h2 className="mt-5"> Run Totals </h2>
                    <canvas ref={runTotalsGraphRef} width="995" height="400"></canvas>
                    <div className="mt-3">
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
                                Monday: {numberWithCommas(pageData.mondayAverage)}
                            </p>
                            <p>
                                Tuesday: {numberWithCommas(pageData.tuesdayAverage)}
                            </p>
                            <p>
                                Wednesday: {numberWithCommas(pageData.wednesdayAverage)}
                            </p>
                            <p>
                                Thursaday: {numberWithCommas(pageData.thursdayAverage)}
                            </p>
                            <p>
                                Friday: {numberWithCommas(pageData.fridayAverage)}
                            </p>
                            <p>
                                Saturday: {numberWithCommas(pageData.saturdayAverage)}
                            </p>
                            <p>
                                Sunday: {numberWithCommas(pageData.saturdayAverage)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper >
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
    Object.keys(versionUsage).forEach(v => {
        if (versionUsage[v] < versionUsage[toRemove])
            toRemove = v;
    });
    delete versionUsage[toRemove];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}