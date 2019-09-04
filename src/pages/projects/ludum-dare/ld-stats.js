import React, { Component } from "react";

import Chart from "chart.js";

import PageWrapper from "../../base/page-wrapper"


/*Overall, Theme, Innovation, Fun, Graphics, Audio*/
const ld27 = { display: "LD27 (1437 games)", totalGames: 1437, overall: 1142, theme: 603, innovation: 931, fun: 1141, graphics: 1040, audio: 0 };
const ld28 = { display: "LD28 (1284 games)", totalGames: 1284, overall: 929, theme: 618, innovation: 918, fun: 802, graphics: 941, audio: 0 };
const ld29 = { display: "LD29 (1492 games)", totalGames: 1492, overall: 1099, theme: 889, innovation: 450, fun: 1063, graphics: 1231, audio: 0 };
const ld30 = { display: "LD30 (1493 games)", totalGames: 1493, overall: 802, theme: 546, innovation: 959, fun: 642, graphics: 1135, audio: 0 };
const ld31 = { display: "LD31 (1364 games)", totalGames: 1364, overall: 1025, theme: 1098, innovation: 1172, fun: 1024, graphics: 854, audio: 0 };
const ld32 = { display: "LD32 (1353 games)", totalGames: 1353, overall: 1006, theme: 843, innovation: 1049, fun: 893, graphics: 985, audio: 0 };
const ld34 = { display: "LD34 (1231 games)", totalGames: 1231, overall: 923, theme: 910, innovation: 718, fun: 926, graphics: 886, audio: 0 };
const ld35 = { display: "LD35 (1117 games)", totalGames: 1117, overall: 490, theme: 339, innovation: 221, fun: 392, graphics: 542, audio: 443 };
const ld37 = { display: "LD37 (901 games)", totalGames: 901, overall: 294, theme: 264, innovation: 119, fun: 239, graphics: 560, audio: 342 };
const ld39 = { display: "LD39 (990 games)", totalGames: 990, overall: 410, theme: 323, innovation: 170, fun: 525, graphics: 474, audio: 328 };
const comps = [ld27, ld28, ld29, ld30, ld31, ld32, ld34, ld35, ld37, ld39];

class LDStats extends Component {
    constructor(props) {
        super(props);

        this.statsRef = React.createRef();
        this.percentileRef = React.createRef();
    }

    getCategory(cat) {
        var data = [];
        for (var i = 0; i < comps.length; i++)
            data[i] = comps[i][cat];

        return data;
    }

    getPercentile(cat) {
        var toReturn = new Array();
        for (var i = 0; i < comps.length; i++) {
            toReturn.push(Math.round((1 - ((comps[i][cat] == 0 ? comps[i]["totalGames"] : comps[i][cat]) / comps[i]["totalGames"])) * 100));
        }
        return toReturn;
    }


    componentDidMount() {
        let stats = {
            labels: this.getCategory("display"),
            datasets: [
                {
                    label: "Overall",
                    fill: false,
                    backgroundColor: "rgba(34, 153, 84,0.5)",
                    borderColor: "rgba(34, 153, 84,0.8)",
                    data: this.getCategory("overall")
                },
                {
                    label: "Theme",
                    fill: false,
                    backgroundColor: "rgba(230, 126, 34,0.5)",
                    borderColor: "rgba(230, 126, 34,0.8)",
                    data: this.getCategory("theme")
                },
                {
                    label: "Innovation",
                    fill: false,
                    backgroundColor: "rgba(169, 50, 38,0.5)",
                    borderColor: "rgba(169, 50, 38,0.8)",
                    data: this.getCategory("innovation")
                },
                {
                    label: "Fun",
                    fill: false,
                    backgroundColor: "rgba(244, 208, 63,0.5)",
                    borderColor: "rgba(244, 208, 63,0.8)",
                    data: this.getCategory("fun")
                },
                {
                    label: "Graphics",
                    fill: false,
                    backgroundColor: "rgba(46, 134, 193,0.5)",
                    borderColor: "rgba(46, 134, 193,0.8)",
                    data: this.getCategory("graphics")
                },
                {
                    label: "Audio",
                    fill: false,
                    backgroundColor: "rgba(125, 60, 152,0.5)",
                    borderColor: "rgba(125, 60, 152,0.8)",
                    data: this.getCategory("audio")
                }
            ]
        };

        let percentile = {
            labels: this.getCategory("display"),
            datasets: [
                {
                    label: "Overall",
                    fill: false,
                    backgroundColor: "rgba(34, 153, 84,0.5)",
                    borderColor: "rgba(34, 153, 84,0.8)",
                    data: this.getPercentile("overall")
                },
                {
                    label: "Theme",
                    fill: false,
                    backgroundColor: "rgba(230, 126, 34,0.5)",
                    borderColor: "rgba(230, 126, 34,0.8)",
                    data: this.getPercentile("theme")
                },
                {
                    label: "Innovation",
                    fill: false,
                    backgroundColor: "rgba(169, 50, 38,0.5)",
                    borderColor: "rgba(169, 50, 38,0.8)",
                    data: this.getPercentile("innovation")
                },
                {
                    label: "Fun",
                    fill: false,
                    backgroundColor: "rgba(244, 208, 63,0.5)",
                    borderColor: "rgba(244, 208, 63,0.8)",
                    data: this.getPercentile("fun")
                },
                {
                    label: "Graphics",
                    fill: false,
                    backgroundColor: "rgba(46, 134, 193,0.5)",
                    borderColor: "rgba(46, 134, 193,0.8)",
                    data: this.getPercentile("graphics")
                },
                {
                    label: "Audio",
                    fill: false,
                    backgroundColor: "rgba(125, 60, 152,0.5)",
                    borderColor: "rgba(125, 60, 152,0.8)",
                    data: this.getPercentile("audio")
                }
            ]
        };
        var ctx = this.statsRef.current.getContext("2d");
        new Chart(ctx, { type: 'line', data: stats });
        ctx = this.percentileRef.current.getContext("2d");
        new Chart(ctx, { type: 'line', data: percentile });
    }

    render() {
        return (
            <PageWrapper>
                <div id="Charts">
                    <header>
                        <hgroup>
                            <h1>My Ludum Dare Stats</h1>
                        </hgroup>
                    </header>
                    <div id="LD_Stats">
                        <center><p></p><h2> Category Placement Ranks (Lower is Better) </h2><p></p></center>
                        <canvas ref={this.statsRef} width="1057" height="424" style={{ display: "block", width: "1057px", height: "424px" }}></canvas>
                        <center><p></p><h2> Percentile Placement Ranks (Higher is Better) </h2><p></p></center>
                        <canvas ref={this.percentileRef} width="1057" height="424" style={{ display: "block", width: "1057px", height: "424px" }}></canvas>
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default LDStats;