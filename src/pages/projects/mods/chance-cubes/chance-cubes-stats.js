import React, { Component } from "react";
import Chart from "chart.js";

import PageWrapper from "../../../base/page-wrapper";

const colors = ["#1e90ff", "#191970", "#9acd32", "#ff1493", "#00ced1", "#db7093",
    "#daa520", "#0000ff", "#98fb98", "#ff00ff", "#cd5c5c", "#ffa07a", "#dda0dd",
    "#800080", "#0000cd", "#a020f0", "#7fffd4", "#ffb6c1", "#ffd700", "#ff0000",
    "#d2691e", "#000080", "#ff6347", "#4682b4", "#dc143c", "#adff2f", "#d2b48c",
    "#ee82ee", "#808000", "#ff69b4", "#9370db", "#9932cc", "#8fbc8f", "#00bfff",
    "#ff8c00", "#008080", "#32cd32", "#f0e68c", "#87ceeb", "#ffff00", "#00ff00",
    "#00fa9a","#708090"];

var usedColors = [];
var charts = [];

class ChanceCubesStats extends Component {
    constructor(props) {
        super(props);

        let now = new Date();
        let twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(now.getMonth() - 2);

        this.state = {
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
        }

        this.versionLineGraphRef = React.createRef();
        this.versionPieGraphRef = React.createRef();
        this.mcVersionUsageGraphRef = React.createRef();
        this.mcVersionPieGraphRef = React.createRef();
        this.mcVersionLineGraphRef = React.createRef();
        this.runTotalsGraphRef = React.createRef();
    }

    getColorForKey(key) {
        if (usedColors.indexOf(key) == -1) {
            usedColors[usedColors.length] = key;
        }

        let index = usedColors.indexOf(key);
        index = index % colors.length;

        return colors[index];
    }

    updateStatData() {
        var start = document.getElementById("date_start").value;
        var end = document.getElementById("date_end").value

        fetch(`https://api.theprogrammingturkey.com/chance_cubes/ChanceCubesStats.php?Start=${start}&End=${end}`).then(response =>
            response.json()
        ).then((json) => {
            this.updateGraphs(json);
            this.updateMoreStats(json);
        });
    }

    updateGraphs(json) {
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
                backgroundColor: this.getColorForKey(key),
                borderColor: this.getColorForKey(key),
                data: json["Versions"][key]
            }

            if (json["Versions"][key][json["Versions"][key].length - 1] != 0) {
                labels[index2] = key;
                labelColors[index2] = this.getColorForKey(key);
                pieData[index2] = json["Versions"][key][json["Versions"][key].length - 1];
                index2++;
            }
            index++;
        }

        var ctx = this.versionLineGraphRef.current.getContext("2d");
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
        var ctx = this.versionPieGraphRef.current.getContext("2d");
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
                backgroundColor: this.getColorForKey(key),
                borderColor: this.getColorForKey(key),
                data: json["MC Versions"][key]
            }

            if (!(key === "All")) {
                labels[index] = key;
                labelColors[index] = this.getColorForKey(key);
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
                    backgroundColor: this.getColorForKey(key),
                    borderColor: this.getColorForKey(key),
                    data: keyData
                }

                index++;
            }
        }

        var ctx = this.mcVersionUsageGraphRef.current.getContext("2d");
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

        var ctx = this.mcVersionLineGraphRef.current.getContext("2d");
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
        var ctx = this.mcVersionPieGraphRef.current.getContext("2d");
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

        var ctx = this.runTotalsGraphRef.current.getContext("2d");
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

    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    updateMoreStats(json) {
        this.setState({
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

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    formatDate(date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    componentDidMount() {
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
        document.getElementById("date_start").setAttribute("max", today);
        document.getElementById("date_end").setAttribute("max", today);
        document.getElementById("date_start").setAttribute("value", startDay);
        document.getElementById("date_end").setAttribute("value", today);

        this.updateStatData();
    }

    render() {
        return (
            <PageWrapper>
                <div id="charts">
                    <header>
                        <hgroup className="text-center">
                            <h1>Chance Cubes Version Stats</h1>
                            Start:
                                <input type="date" id="date_start" min="2017-05-05" max="2017-05-06" value={this.formatDate(this.state.startDate)} onChange={() => this.updateStatData()} />
                            End:
                                <input type="date" id="date_end" min="2017-05-05" max="2017-05-06" value={this.formatDate(this.state.endDate)} onChange={() => this.updateStatData()} />
                        </hgroup>
                    </header>
                    <div id="LD_Stats" className="text-center">
                        <h2 className="mt-5"> Version usage </h2>
                        <canvas ref={this.versionLineGraphRef} width="995" height="400"></canvas>
                        <h2 className="mt-5"> Version usage % </h2>
                        <canvas ref={this.versionPieGraphRef} width="995" height="400"></canvas>
                        <h2 className="mt-5"> MC Version usage</h2>
                        <canvas ref={this.mcVersionUsageGraphRef} width="995" height="400"></canvas>
                        <h2 className="mt-5"> MC Version usage % </h2>
                        <canvas ref={this.mcVersionPieGraphRef} width="995" height="400"></canvas>
                        <h2 className="mt-5"> MC Version usage % over Time</h2>
                        <canvas ref={this.mcVersionLineGraphRef} width="995" height="400"></canvas>
                        <h2 className="mt-5"> Run Totals </h2>
                        <canvas ref={this.runTotalsGraphRef} width="995" height="400"></canvas>
                        <div className="mt-3">
                            <div>
                                <p>
                                    {`Total Mod Runs: ${this.numberWithCommas(this.state.totalRuns)} (${this.numberWithCommas(this.state.totalDays)} days)`}
                                </p>
                            </div>
                            <div>
                                <p>
                                    {`Average Daily Mod Runs: ${this.numberWithCommas(this.state.averageRunsMonth)} (Last 30 days)`}
                                </p>
                            </div>
                            <div>
                                <p>
                                    {`Most Single Day Runs: ${this.numberWithCommas(this.state.mostRuns)} (${this.state.mostRunsDay})`}
                                </p>
                            </div>
                            <p>--- Average runs per day ---</p>
                            <div>
                                <p>
                                    Monday: {this.numberWithCommas(this.state.mondayAverage)}
                                </p>
                                <p>
                                    Tuesday: {this.numberWithCommas(this.state.tuesdayAverage)}
                                </p>
                                <p>
                                    Wednesday: {this.numberWithCommas(this.state.wednesdayAverage)}
                                </p>
                                <p>
                                    Thursaday: {this.numberWithCommas(this.state.thursdayAverage)}
                                </p>
                                <p>
                                    Friday: {this.numberWithCommas(this.state.fridayAverage)}
                                </p>
                                <p>
                                    Saturday: {this.numberWithCommas(this.state.saturdayAverage)}
                                </p>
                                <p>
                                    Sunday: {this.numberWithCommas(this.state.saturdayAverage)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default ChanceCubesStats;