import React, { Component } from "react";

import PageWrapper from "../base/page-wrapper"

const support = [
    { bg: "#7CFC00", text: "S-A" },
    { bg: "#006400", text: "S-NA" },
    { bg: "#FFFF00", text: "IP" },
    { bg: "#00BFFF", text: "NS-PS" },
    { bg: "#8B0000", text: "NS-NP" },
    { bg: "#E24C00", text: "NS-M" },
];

const projects = {
    "Chance Cubes": [1, 1, 1, 1, 1, 1, 1, 0, 2],
    "A Block of Charcoal": [1, 4, 4, 1, 1, 1, 1, 0, 0],
    "A Block of Flint": [4, 4, 4, 4, 4, 1, 1, 0, 0],
    "Headcrumbs": [1, 4, 1, 1, 1, 1, 4, 2, 5],
    "Withercrumbs": [1, 4, 4, 1, 4, 1, 4, 3, 5],
    "Colored Name Tags": [4, 4, 4, 4, 4, 1, 4, 5, 5],
    "Block Highlighter": [4, 4, 4, 1, 4, 1, 4, 5, 5],
    "Progression Tweaks": [4, 4, 4, 4, 4, 1, 4, 4, 4],
    "Gobble Core": [4, 4, 4, 1, 1, 1, 4, 4, 4],
    "Custom UI": [4, 4, 1, 1, 1, 1, 4, 4, 4],
    "TurkeyUtil": [1, 4, 4, 4, 4, 4, 4, 4, 4],
    "Void Compression": [1, 4, 4, 4, 4, 4, 4, 4, 4]
};

class MCModSupport extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PageWrapper>
                <div>
                    <div className="m-2">
                        <table className="table">
                            <thead>
                                <tr className="text-center text-light">
                                    <th scope="col">Mod/ Version</th>
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
                                {Object.keys(projects).map((mod) => {
                                    return (
                                        <tr key={mod}>
                                            <th scope="row" className="p-1 text-light"> {mod} </th>
                                            {projects[mod].map((supportID, index) => {
                                                return (
                                                    <td key={`${mod}-${index}`} className="p-1 text-center" style={{ backgroundColor: support[supportID].bg }}>
                                                        {support[supportID].text}
                                                    </td>
                                                )
                                            })}
                                        </tr>)
                                })
                                }
                            </tbody>
                        </table>
                        <div>
                            <span className="mt-2" style={{ background: "#7CFC00", padding: "0px 15px 0px 14px" }}>
                                S-A
                            </span>
                            <span>
                                = Supported with active development
                            </span>
                        </div>
                        <div>
                            <span className="mt-2" style={{ background: "#006400", padding: "0px 9px 0px 8px" }}>
                                S-NA
                            </span>
                            <span>
                                = Supported, but no active development; Will receive bug fixes if necessary.
                            </span>
                        </div>
                        <div>
                            <span className="mt-2" style={{ background: "#FFFF00", padding: "0px 21px 0px 20px" }}>
                                IP
                            </span>
                            <span>
                                = Port currently being developed for this version
                            </span>
                        </div>
                        <div>
                            <span className="mt-2" style={{ background: "#00BFFF", padding: "0px 5px 0px 5px" }}>
                                NS-PS
                            </span>
                            <span>
                                = Not supported, but a port is planned for this version
                            </span>
                        </div>
                        <div>
                            <span className="mt-2" style={{ background: "#8B0000", padding: "0px 3px 0px 3px" }}>
                                NS-NP
                            </span>
                            <span>
                                = Not supported and this version is not planned to recieve a port
                            </span>
                        </div>
                        <div>
                            <span className="mt-2" style={{ background: "#E24C00", padding: "0px 7px 0px 6px" }}>
                                NS-M
                            </span>
                            <span>
                                = Not supported and this version might recieve a port in the future, but is unknown
                            </span>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}

export default MCModSupport;