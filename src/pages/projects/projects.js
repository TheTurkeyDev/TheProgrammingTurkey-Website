import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PageWrapper from "../base/page-wrapper";

const LDGames = [
    { title: "Power Synergy", subtitle: "LudumDare 39", link: "/projects/ld39", image: "/images/ld39.png" },
    { title: "Hedge Maze Overlord", subtitle: "LudumDare 37", link: "/projects/ld37", image: "/images/ld37.png" },
    { title: "Geo-Shifter", subtitle: "LudumDare 35", link: "/projects/ld35", image: "/images/ld35.png" },
    { title: "Turkeyconn Simulator 2016", subtitle: "LudumDare 34", link: "/projects/ld34", image: "/images/ld34.png" },
    { title: "God-Kill-A", subtitle: "LudumDare 33", link: "/projects/ld33", image: "/images/ld33.png" },
    { title: "Unconventional Dungeon", subtitle: "LudumDare 32", link: "/projects/ld32", image: "/images/ld32.png" },
    { title: "Game Evolution", subtitle: "LudumDare 31", link: "/projects/ld31", image: "/images/ld31.png" },
    { title: "World Swap", subtitle: "LudumDare 30", link: "/projects/ld30", image: "/images/ld30.png" },
    { title: "Maze Sweeper", subtitle: "LudumDare 29", link: "/projects/ld29", image: "/images/ld29.png" },
    { title: "Ninja Theif", subtitle: "LudumDare 28", link: "/projects/ld28", image: "/images/ld28.png" },
    { title: "Flash Memory", subtitle: "LudumDare 27", link: "/projects/ld27", image: "/images/ld27.png" },
];

const Mods = [
    { title: "Chance Cubes", subtitle: "Minecraft", link: "/projects/chance-cubes-mc", image: "/images/chance_cubes.png" },
    { title: "Raft Twitch Integration", subtitle: "Raft", link: "/projects/raft-integration", image: "http://files.theprogrammingturkey.com/images/raft_twitch_integration_mod_logo.jpg" },
    { title: "Slime Rancher Twitch Integration", subtitle: "Slime Rancher", link: "/projects/raft-integration", image: "http://files.theprogrammingturkey.com/images/raft_twitch_integration_mod_logo.jpg" },
    { title: "A Block of Charcoal", subtitle: "Minecraft", link: "/projects/block-of-charcoal", image: "/images/charcoal_block.png" },
    { title: "A Block of Flint", subtitle: "Minecraft", link: "/projects/block-of-flint", image: "/images/flint_block.png" },
    { title: "Headcrumbs", subtitle: "Minecraft", link: "/projects/head-crumbs", image: "/images/wither_crumbs.png" },
    { title: "Withercrumbs", subtitle: "Minecraft", link: "/projects/wither-crumbs", image: "/images/wither_crumbs.png" },
    { title: "Call of minecraft: Zombies", subtitle: "Minecraft (Plugin/ Bukkit)", link: "/projects/comz", image: "/images/comz.png" },
    { title: "Chance Cubes", subtitle: "Stardew Valley", link: "/projects/chance-cubes-sdv", image: "/images/chance_cubes.png" },
    { title: "Colored Name Tags", subtitle: "Minecraft", link: "/projects/colored-name-tags", image: "/images/colored_name_tags.png" },
    { title: "Block Highlighter", subtitle: "Minecraft", link: "/projects/block-highlighter", image: "/images/block_highlighter.png" },
    { title: "Progression Tweaks", subtitle: "Minecraft", link: "/projects/progression-tweaks", image: "/images/progression_tweaks.png" },
    { title: "Gobble Core", subtitle: "Minecraft", link: "/projects/gobble-core", image: "/images/gobble_core.png" },
    { title: "CustomUI", subtitle: "Minecraft", link: "/projects/custom-ui", image: "/images/custom_ui.png" },
    { title: "TurkeyUtil", subtitle: "Minecraft", link: "/projects/turkey-util", image: "/images/turkey_util.png" },
    { title: "Void Compression", subtitle: "Minecraft", link: "/projects/void-compression", image: "/images/void_compression.png" },
];

class Projects extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let type = "all";
        if (this.props.location && this.props.location.search) {
            let params = this.props.location.search.substring(1).split("&");
            params.forEach((element) => {
                let keyVal = element.split("=");
                if (keyVal[0] === "type")
                    type = keyVal[1];
            });
        }

        return (
            <PageWrapper>
                {
                    type === "mods" &&
                    <div className="text-center mt-3">
                        <h4 style={{ textDecoration: "underline" }}><Link to="/mod-support">View My Current Mod Version Support Chart</Link></h4>
                    </div>
                }

                {

                    (type === "all" || type === "mods") &&
                    <div className="text-center container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <h1><u>Mods</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            {
                                Mods.map((mod, i) => {
                                    return (
                                        <div key={i} className="col-sm-6 col-md-4 col-lg-3 mt-3 anim-slide-in">
                                            <Link to={mod.link} style={{ overflow: "hidden" }}>
                                                <img src={mod.image} alt="Logo" width="224px" height="126px" style={{ objectFit: "contain" }} />
                                                <div><span>{mod.title}</span></div>
                                                <div><span>{mod.subtitle}</span></div>
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
                {
                    (type === "all" || type === "ld") &&
                    <div className="text-center container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <h1><u>Ludum Dare Games</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            {
                                LDGames.map((game, i) => {
                                    return (
                                        <div key={i} className="col-sm-6 col-md-4 col-lg-3 mt-3 anim-slide-in">
                                            <Link to={game.link}>
                                                <img src={game.image} alt="Logo" width="224px" height="126px" />
                                                <div><span>{game.title}</span></div>
                                                <div><span>{game.subtitle}</span></div>
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
                {
                    (type === "all" || type === "other") &&
                    <div className="text-center container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <h1><u>Test Games</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <Link to="/projects/pizza-man">
                                    Pizza Man - A game made to test my GameAPI!
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1><u>Applications</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <Link to="/projects/gg-server">
                                    <div><span>GG Server</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <Link to="/projects/turkey-bot">
                                    <div><span>TurkeyBot</span></div>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1><u>API's and Sorts</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <a onClick={() => window.open('https://github.com/Turkey2349/VolatiliaAPI-Java')} href="">
                                    <img src="/images/volatillia_api_java.png" alt="vapi_java_logo" width="224px" height="126px" />
                                    <div><span>VolatiliaAPI - Java</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <Link to="/projects/volatiliaapi-ogl">
                                    <img src="/images/volatillia_api_java_opengl.png" alt="vapi_java_ogl_logo" width="224px" height="126px" />
                                    <div><span>VolatiliaAPI - Java OpenGL API</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <a onClick={() => window.open('https://github.com/Turkey2349/VolatiliaAPI-WebAccess')} href="">
                                    <img src="/images/volatillia_api_web_access.png" alt="vapi_web_access_logo" width="224px" height="126px" />
                                    <div><span>VolatiliaAPI - WebAccess</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <Link to="/projects/gameapi">
                                    <img src="/images/volatillia_api_java_swing.png" alt="vapi_java_swing_logo" width="224px" height="126px" />
                                    <div><span>VolatiliaAPI - Java Swing API</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                <a onClick={() => window.open('https://github.com/Turkey2349/NHLStatsAPI-Java')} href="">
                                    <img src="/images/nhl_logo.png" alt="vc_logo" width="224px" height="126px" />
                                    <div><span>NHL Stats API</span></div>
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </PageWrapper>
        );
    }
}

export default Projects;