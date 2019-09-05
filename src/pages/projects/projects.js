import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PageWrapper from "../base/page-wrapper";

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
                    (type === "all" || type === "ld") &&
                    <div className="text-center container-fluid mt-3">
                        <div className="row">
                            <div className="col">
                                <h1><u>Ludum Dare Games</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD39.php">
                                    <img src="/images/ld39.png" alt="39_Logo" width="224px" height="126px" />
                                    <div><span>Power Synergy</span></div>
                                    <div><span>LudumDare 39</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD37.php">
                                    <img src="/images/ld37.png" alt="37_Logo" width="224px" height="126px" />
                                    <div><span>Hedge Maze Overlord</span></div>
                                    <div><span>LudumDare 37</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD35.php">
                                    <img src="/images/ld35.png" alt="35_Logo" width="224px" height="126px" />
                                    <div><span>Geo-Shifter</span></div>
                                    <div><span>LudumDare 35</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD34.php">
                                    <img src="/images/ld34.png" alt="34_Logo" width="224px" height="126px" />
                                    <div><span>Turkeyconn Simulator 2016</span></div>
                                    <div><span>LudumDare 34</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD33.php">
                                    <img src="/images/ld33.png" alt="33_Logo" width="224px" height="126px" />
                                    <div><span>God-Kill-A</span></div>
                                    <div><span>LudumDare 33</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD32.php">
                                    <img src="/images/ld32.png" alt="32_Logo" width="224px" height="126px" />
                                    <div><span>Unconventional Dungeon</span></div>
                                    <div><span>LudumDare 32</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD31.php">
                                    <img src="/images/ld31.png" alt="31_Logo" width="224px" height="126px" />
                                    <div><span>Game Evolution</span></div>
                                    <div><span>LudumDare 31</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD30.php">
                                    <img src="/images/ld30.png" alt="30_Logo" width="224px" height="126px" />
                                    <div><span>World Swap</span></div>
                                    <div><span>LudumDare 30</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD29.php">
                                    <img src="/images/ld29.png" alt="29_Logo" width="224px" height="126px" />
                                    <div><span>Maze Sweeper</span></div>
                                    <div><span>LudumDare 29</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="/projects/ld28">
                                    <img src="/images/ld28.png" alt="28_Logo" width="224px" height="126px" />
                                    <div><span>Ninja Theif</span></div>
                                    <div><span>LudumDare 28</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="/projects/ld27">
                                    <img src="/images/ld27.png" alt="27_Logo" width="224px" height="126px" />
                                    <div><span>Flash Memory</span></div>
                                    <div><span>LudumDare 27</span></div>
                                </Link>
                            </div>
                        </div>
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
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="chance-cubes-mc">
                                    <img src="/images/chance_cubes.png" alt="cc_logo" width="224px" height="126px" />
                                    <div><span>Chance Cubes</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="head-crumbs">
                                    <img src="/images/wither_crumbs.png" alt="hc_logo" width="224px" height="126px" />
                                    <div><span>Headcrumbs</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="wither-crumbs">
                                    <img src="/images/wither_crumbs.png" alt="wc_logo" width="224px" height="126px" />
                                    <div><span>Withercrumbs</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="block-of-charcoal">
                                    <img src="/images/charcoal_block.png" alt="boc_logo" width="224px" height="126px" />
                                    <div><span>A Block of Charcoal</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="block-of-flint">
                                    <img src="/images/flint_block.png" alt="bof_logo" width="224px" height="126px" />
                                    <div><span>A Block of Flint</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="chance-cubes-sdv">
                                    <img src="/images/comz.png" alt="comz_logo" width="224px" height="126px" />
                                    <div><span>Call of minecraft: Zombies</span></div>
                                    <div><span>Minecraft (Plugin/ Bukkit)</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="comz">
                                    <img src="/images/chance_cubes.png" alt="cc_logo" width="224px" height="126px" />
                                    <div><span>Chance Cubes</span></div>
                                    <div><span>Stardew Valley</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="colored-name-tags">
                                    <img src="/images/colored_name_tags.png" alt="cn_logo" width="224px" height="126px" />
                                    <div><span>Colored Name Tags</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="block-highlighter">
                                    <img src="/images/block_highlighter.png" alt="bh_logo" width="224px" height="126px" />
                                    <div><span>Block Highlighter</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="progression-tweaks">
                                    <img src="/images/chance_cubes.png" alt="pt_logo" width="224px" height="126px" />
                                    <div><span>Progression Tweaks</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="gobble-core">
                                    <img src="/images/gobble_core.png" alt="gc_logo" width="224px" height="126px" />
                                    <div><span>Gobble Core</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="custom-ui">
                                    <img src="/images/chance_cubes.png" alt="cu_logo" width="224px" height="126px" />
                                    <div><span>CustomUI</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="turkey-util">
                                    <img src="/images/turkey_util.png" alt="tu_logo" width="224px" height="126px" />
                                    <div><span>TurkeyUtil</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="void-compression">
                                    <img src="/images/chance_cubes.png" alt="vc_logo" width="224px" height="126px" />
                                    <div><span>Void Compression</span></div>
                                    <div><span>Minecraft</span></div>
                                </Link>
                            </div>
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
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <Link to="/projects/pizza-man">
                                    Pizza Man - A game made to test my GameAPI!
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1><u>API's and Sorts</u></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <img src="/images/volatillia_api_java.png" alt="vapi_java_logo" width="224px" height="126px" />
                                <a onClick={() => window.open('https://github.com/Turkey2349/VolatiliaAPI-Java')}>
                                    VolatiliaAPI - Java
			                    </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <img src="/images/volatillia_api_java_opengl.png" alt="vapi_java_ogl_logo" width="224px" height="126px" />
                                <Link to="/projects/volatiliaapi-ogl">
                                    VolatiliaAPI - Java OpenGL API
			                    </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <img src="/images/volatillia_api_web_access.png" alt="vapi_web_access_logo" width="224px" height="126px" />
                                <a onClick={() => window.open('https://github.com/Turkey2349/VolatiliaAPI-WebAccess')}>
                                    VolatiliaAPI - WebAccess
			                    </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <img src="/images/volatillia_api_java_swing.png" alt="vapi_java_swing_logo" width="224px" height="126px" />
                                <Link to="gameapi">
                                    VolatiliaAPI - Java Swing API
			                    </Link>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a onClick={() => window.open('https://github.com/Turkey2349/NHLStatsAPI-Java')}>
                                    NHL Stats API
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