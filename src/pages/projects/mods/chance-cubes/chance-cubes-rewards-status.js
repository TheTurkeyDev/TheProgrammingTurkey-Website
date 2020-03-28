import React, { Component } from "react";

import PageWrapper from "../../../base/page-wrapper"

const statusInfo = [
    { bg: "#b0b0b0", text: "Untested" },
    { bg: "#046e22", text: "Working" },
    { bg: "#d15b00", text: "Not Working" },
    { bg: "#bf0000", text: "Bugged" }
];

const gameVersions = [
    "1.7.10",
    "1.8",
    "1.9",
    "1.10",
    "1.11",
    "1.12",
    "1.13",
    "1.14",
    "1.15"
]

class ChanceCubesRewardsStatus extends Component {
    constructor(props) {
        super(props);
        this.state = { rewards: {} };

        fetch("http://api.theprogrammingturkey.com/chance_cubes/RewardStatusAPI.php")
            .then(resp => resp.json())
            .then(json => {
                let rewards = {};
                json.forEach(element => {
                    if (!rewards.hasOwnProperty(element.reward_name))
                        rewards[element.reward_name] = {};
                    rewards[element.reward_name][element.game_version] = element.status;
                });

                this.setState({ rewards: rewards });
            });
    }

    render() {
        return (
            <PageWrapper>

                <div className="text-center ml-2 fluid-container row">
                    {
                        statusInfo.map(json => {
                            return (
                                <div className="col-auto m-2" style={{ background: json.bg, width: "125px" }}>
                                    {json.text}
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className="m-2">
                        <table className="table">
                            <thead>
                                <tr className="text-center text-light">
                                    <th scope="col">Reward/ Version</th>
                                    <th scope="col">1.7.10</th>
                                    <th scope="col">1.8</th>
                                    <th scope="col">1.9</th>
                                    <th scope="col">1.10</th>
                                    <th scope="col">1.11</th>
                                    <th scope="col">1.12</th>
                                    <th scope="col">1.13</th>
                                    <th scope="col">1.14</th>
                                    <th scope="col">1.15</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(this.state.rewards).sort((a, b) => a.localeCompare(b)).map((reward) => {
                                        return (
                                            <tr key={reward}>
                                                <th scope="row" className="p-1 text-light"> {reward} </th>
                                                {
                                                    gameVersions.map((version, index) => {
                                                        let status = 0;
                                                        if (this.state.rewards[reward].hasOwnProperty(version))
                                                            status = this.state.rewards[reward][version];
                                                        return (
                                                            <td key={`${version}-${index}`} className="p-1 text-center" style={{ backgroundColor: statusInfo[status]["bg"] }}>
                                                            </td>
                                                        )
                                                    })
                                                }
                                            </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}

export default ChanceCubesRewardsStatus;