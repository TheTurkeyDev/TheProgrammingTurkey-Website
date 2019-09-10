import React, { Component } from "react";
import Chart from "chart.js";

import PageWrapper from "../../base/page-wrapper";

const colors = ["#4bbdf4", "#32d68e", "#c990ba", "#dc6242", "#98af92",
    "#0f7dbc", "#7d6e92", "#b20ee1", "#df1200", "#6d2f2a", "#d0b40d",
    "#4b09b9", "#b36190", "#bcfbe6", "#ad3016", "#01579B", "#01773a",
    "#ef8c46", "#ffef69", "#42f962", "#14c5da", "#f5a7fc", "#0a2581",
    "#2E2E2E", "#4D411E", "##332B14", "##52bd00", "#ff3a3a", "#e91515"];

var usedColors = [];
var charts = [];

class ChanceCubesStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.mcVersionPieGraphRef = React.createRef();
        this.mcVersionLineGraphRef = React.createRef();
        this.runTotalsGraphRef = React.createRef();
        this.totalStatRef = React.createRef();
        this.averageStatRef = React.createRef();
        this.mostStatRef = React.createRef();
        this.dailyRunsStatRef = React.createRef();
    }

    getColorForKey(key) {
        if (usedColors.indexOf(key) == -1) {
            usedColors[usedColors.length] = key;
        }

        return colors[usedColors.indexOf(key)];
    }

    updateStatData() {
        var start = document.getElementById("date_start").value;
        var end = document.getElementById("date_end").value

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = `https://theprogrammingturkey.com/ChanceCubesStatsGet.php?Start=${start}&End=${end}`
        fetch(proxyUrl + targetUrl).then(response =>
            response.json()
        ).then((json) => {
            console.log(json);
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

        var ctx = this.mcVersionLineGraphRef.current.getContext("2d");
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
        console.log("here");
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

        var dayText = "";

        dayText += "Monday: " + numberWithCommas(parseInt(json["DailyTotals"][3] / json["DailyTotals"][10])) + "<br>";
        dayText += "Tuesday: " + numberWithCommas(parseInt(json["DailyTotals"][4] / json["DailyTotals"][11])) + "<br>";
        dayText += "Wednesday: " + numberWithCommas(parseInt(json["DailyTotals"][5] / json["DailyTotals"][12])) + "<br>";
        dayText += "Thursaday: " + numberWithCommas(parseInt(json["DailyTotals"][6] / json["DailyTotals"][13])) + "<br>";
        dayText += "Friday: " + numberWithCommas(parseInt(json["DailyTotals"][0] / json["DailyTotals"][7])) + "<br>";
        dayText += "Saturday: " + numberWithCommas(parseInt(json["DailyTotals"][1] / json["DailyTotals"][8])) + "<br>";
        dayText += "Sunday: " + numberWithCommas(parseInt(json["DailyTotals"][2] / json["DailyTotals"][9]));

        document.getElementById("Daily_Runs").innerHTML = dayText;
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                                <input type="date" id="date_start" min="2017-05-05" max="2017-05-06" value="2017-05-05" onChange={() => updateStatData()} />
                            End:
                                <input type="date" id="date_end" min="2017-05-05" max="2017-05-06" value="2017-05-05" onChange={() => updateStatData()} />
                        </hgroup>
                    </header>
                    <div id="LD_Stats" className="text-center">
                        <h2> Version usage </h2>
                        <canvas ref={this.versionLineGraphRef} width="995" height="400"></canvas>
                        <h2> Version usage % </h2>
                        <canvas ref={this.versionPieGraphRef} width="995" height="400"></canvas>
                        <h2> MC Version usage % </h2>
                        <canvas ref={this.mcVersionPieGraphRef} width="995" height="400"></canvas>
                        <h2> MC Version usage % over Time</h2>
                        <canvas ref={this.mcVersionLineGraphRef} width="995" height="400"></canvas>
                        <h2> Run Totals </h2>
                        <canvas ref={this.runTotalsGraphRef} width="995" height="400"></canvas>
                        <div>
                            <div ref={this.totalStatRef}>
                                <p>{`Total Mod Runs: ${this.numberWithCommas(this.state.totalRuns)} (${this.numberWithCommas(this.state.totalDays)} days)`}</p>
                            </div>
                            <div ref={this.averageStatRef}>
                                <p>{`Average Daily Mod Runs: ${this.numberWithCommas(this.state.averageRunsMonth)} (Last 30 days)`}</p>
                            </div>
                            <div ref={this.mostStatRef}>
                                <p>{`Most Single Day Runs: ${this.numberWithCommas(this.state.mostRuns)} (${this.state.mostRunsDay})`}</p>
                            </div>
                            <p>--- Average runs per day ---</p>
                            <div ref={this.dailyRunsStatRef}>
                                <p>Monday: {this.state.mondayAverage}</p>
                                <p>Tuesday: {this.state.tuesdayAverage}</p>
                                <p>Wednesday: {this.state.wednesdayAverage}</p>
                                <p>Thursaday: {this.state.thursdayAverage}</p>
                                <p>Friday: {this.state.fridayAverage}</p>
                                <p>Saturday: {this.state.saturdayAverage}</p>
                                <p>Sunday: {this.state.saturdayAverage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default ChanceCubesStats;