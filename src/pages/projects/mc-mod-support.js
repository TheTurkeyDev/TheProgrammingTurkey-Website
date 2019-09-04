import React, { Component } from "react";

import PageWrapper from "../base/page-wrapper"

const support = [
    { bg: "#7CFC00", text: "AS" },
    { bg: "#006400", text: "S-NA" },
    { bg: "#FFFF00", text: "IP" },
    { bg: "#00BFFF", text: "PS" },
    { bg: "#8B0000", text: "NS-NP" },

]
const projects = {
    "Chance Cubes": [1, 1, 1, 1, 1, 0, 1, 0],
    "A Block of Charcoal": [1, 4, 4, 1, 1, 0, 1, 0],
    "A Block of Flint": [4, 4, 4, 4, 4, 0, 1, 0],
    "Head Crumbs": [1, 4, 1, 1, 1, 0, 4, 2],
    "Wither Crumbs": [1, 4, 4, 1, 4, 0, 4, 3],
    "Colored Name Tags": [4, 4, 4, 4, 4, 0, 4, 3],
    "Block Highlighter": [4, 4, 4, 1, 4, 0, 4, 3],
    "Progression Tweaks": [4, 4, 4, 4, 4, 1, 4, 4],
    "Gobble Core": [4, 4, 4, 1, 1, 1, 4, 4],
    "Custom UI": [4, 4, 1, 1, 1, 1, 4, 4],
    "TurkeyUtil": [1, 4, 4, 4, 4, 4, 4, 4],
    "Void Compression": [1, 4, 4, 4, 4, 4, 4, 4],
}

class MCModSupport extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PageWrapper>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mod/ Version</th>
                            <th scope="col">1.7.10</th>
                            <th scope="col">1.8</th>
                            <th scope="col">1.9</th>
                            <th scope="col">1.10</th>
                            <th scope="col">1.11</th>
                            <th scope="col">1.12</th>
                            <th scope="col">1.13</th>
                            <th scope="col">1.14</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(projects).map((mod) => {
                            return (
                                <tr key={mod}>
                                    <th scope="row" className="p-1">{mod}</th>
                                    {projects[mod].map((supportID) => {
                                        return (
                                            <td key={`${mod}-${support}`} className="p-1" style={{ backgroundColor: support[supportID].bg }}>
                                                {support[supportID].text}
                                            </td>
                                        )
                                    })}
                                </tr>)
                        })
                        }
                    </tbody>
                </table>
            </PageWrapper>
        );
    }
}

export default MCModSupport;