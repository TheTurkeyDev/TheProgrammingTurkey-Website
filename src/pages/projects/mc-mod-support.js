import React from "react";

import { PageWrapper } from "../base/page-wrapper"

const support = [
    { bg: "#7CFC00", text: "S-A", desc: "Supported with active development" },
    { bg: "#006400", text: "S-NA", desc: "Supported, but no active development; Will receive bug fixes if necessary." },
    { bg: "#FFFF00", text: "IP", desc: "Port currently being developed for this version" },
    { bg: "#00BFFF", text: "NS-PS", desc: "Not supported, but a port is planned for this version" },
    { bg: "#8B0000", text: "NS-NP", desc: "Not supported and this version is not planned to recieve a port" },
    { bg: "#E24C00", text: "NS-M", desc: "Not supported and this version might recieve a port in the future, but is unknown" },
];

const projects = {
    "Chance Cubes": [1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
    "A Block of Charcoal": [1, 4, 4, 1, 1, 1, 1, 0, 0, 3],
    "A Block of Flint": [4, 4, 4, 4, 4, 1, 1, 0, 0, 3],
    "Headcrumbs": [1, 4, 1, 1, 1, 1, 4, 5, 5, 5],
    "Withercrumbs": [1, 4, 4, 1, 4, 1, 4, 4, 5, 5],
    "Colored Name Tags": [4, 4, 4, 4, 4, 1, 4, 4, 3, 3],
    "Block Highlighter": [4, 4, 4, 1, 4, 1, 4, 0, 0, 2],
    "Progression Tweaks": [4, 4, 4, 4, 4, 1, 4, 4, 4, 4],
    "Gobble Core": [4, 4, 4, 1, 1, 1, 4, 4, 4, 4],
    "Custom UI": [4, 4, 1, 1, 1, 1, 4, 4, 4, 4],
    "TurkeyUtil": [1, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    "Void Compression": [1, 4, 4, 4, 4, 4, 4, 4, 4, 4]
};

export function MCModSupport() {
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
                                <th scope="col">1.16</th>
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
                    {
                        support.map(status => {
                            return (
                                <div key={status.text}>
                                    <div className="mt-2 text-center" style={{ display: "inline-block", background: status.bg, color: "#111111", width: "60px" }}>
                                        <span> {status.text}</span>
                                    </div>
                                    <span>
                                        = {status.desc}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </PageWrapper>
    );
}