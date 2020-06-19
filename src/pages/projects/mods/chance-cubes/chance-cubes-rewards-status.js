import React, { useEffect, useState } from "react";

import { PageWrapper } from "../../../base/page-wrapper"

const statusInfo = [
    { bg: "#8f8f8f", text: "Untested" },
    { bg: "#046e22", text: "Working" },
    { bg: "#edda09", text: "Not Working" },
    { bg: "#bf0000", text: "Bugged" },
    { bg: "#1f1f1f", text: "Not Available" }
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

export function ChanceCubesRewardsStatus() {
    const [rewards, setRewards] = useState({})
    useEffect(() => {
        fetch("https://api.theprogrammingturkey.com/chance_cubes/RewardStatusAPI.php")
            .then(resp => resp.json())
            .then(json => {
                let rewards = {};
                json.forEach(element => {
                    if (!rewards.hasOwnProperty(element.reward_name))
                        rewards[element.reward_name] = {};
                    rewards[element.reward_name][element.game_version] = element.status;
                });

                setRewards(rewards);
            });
    }, []);

    return (
        <PageWrapper>
            <div className="m-2">
                <div className="container">
                    <div className="row">
                        <div className="col text-right" style={{ width: "150px", maxWidth: "150px" }}>
                            Game Version
                                </div>
                        <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                            Reward Status
                                </div>
                        <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                            %
                                </div>
                        <div className="col m-0 p-0" style={{ width: "150px", maxWidth: "150px" }}>
                            Rewards Working
                                </div>
                        <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                            %
                                </div>
                        <div className="col">

                        </div>
                    </div>
                    {
                        Object.entries(computeVersionCompletion()).map(entry => {
                            return (
                                <div key={entry[0]} className="row">
                                    <div className="col text-right" style={{ width: "150px", maxWidth: "150px" }}>
                                        {entry[0]}:
                                            </div>
                                    <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                                        {entry[1].completed}/{entry[1].total}
                                    </div>
                                    <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                                        {(entry[1].completed / entry[1].total * 100).toFixed(2)}%
                                            </div>
                                    <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                                        {entry[1].working} / {entry[1].completed}
                                    </div>
                                    <div className="col" style={{ width: "150px", maxWidth: "150px" }}>
                                        {(entry[1].working / (entry[1].completed == 0 ? 1 : entry[1].completed) * 100).toFixed(2)}%
                                            </div>
                                    <div className="col">

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="text-center ml-2 fluid-container row">
                {
                    statusInfo.map((json, i) => {
                        return (
                            <div key={i} className="col-auto m-2" style={{ background: json.bg, width: "125px" }}>
                                {json.text}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div className="m-2">
                    <table className="table sticky-table">
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
                                Object.keys(rewards).filter(entry => !entry.startsWith("chancecubes:cr_")).sort((a, b) => a.localeCompare(b)).map((reward) => {
                                    return (
                                        <tr key={reward}>
                                            <td scope="row" className="p-1 text-light"> {reward} </td>
                                            {
                                                gameVersions.map((version, index) => {
                                                    const status = rewards[reward].hasOwnProperty(version) ? rewards[reward][version] : 0;
                                                    return (
                                                        <td key={`${version}-${index}`} className="p-1 text-center" style={{ backgroundColor: statusInfo[status]["bg"], borderRight: "1px solid #ababab" }}>
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
                <div className="mt-4">
                    <h3 className="m-0">Custom User Rewards</h3>
                </div>
                <div className="m-2">
                    <table className="table sticky-table">
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
                                Object.keys(rewards).filter(entry => entry.startsWith("chancecubes:cr_")).sort((a, b) => a.localeCompare(b)).map((reward) => {
                                    return (
                                        <tr key={reward}>
                                            <td scope="row" className="p-1 text-light"> {reward} </td>
                                            {
                                                gameVersions.map((version, index) => {
                                                    let status = 0;
                                                    if (rewards[reward].hasOwnProperty(version))
                                                        status = rewards[reward][version];
                                                    return (
                                                        <td key={`${version}-${index}`} className="p-1 text-center" style={{ backgroundColor: statusInfo[status]["bg"], borderRight: "1px solid #ababab" }}>
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
        </PageWrapper >
    );
}

function computeVersionCompletion(rewards) {
    let versions = {};
    Object.keys(rewards).forEach((reward) => {
        if (!reward.startsWith("chancecubes:cr")) {
            gameVersions.forEach(version => {
                if (!versions.hasOwnProperty(version))
                    versions[version] = { completed: 0, total: 0, working: 0 };

                let status = rewards[reward][version];
                if (status != 4) {
                    versions[version].total += 1;

                    if (status && status != 0) {
                        versions[version].completed += 1;
                        if (status == 1) {
                            versions[version].working += 1;
                        }
                    }
                }
            });
        }
    });
    return versions;
}