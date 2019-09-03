import React, { Component } from 'react';

import PageWrapper from "./base/page-wrapper";

class Projects extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let type = this.props.match.params.type;
        return (
            <PageWrapper>
                {
                    (type === "all" || type === "ld") &&
                    <div className="text-center container-fluid">
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
                                <a href="LD28.php">
                                    <img src="/images/ld28.png" alt="28_Logo" width="224px" height="126px" />
                                    <div><span>Ninja Theif</span></div>
                                    <div><span>LudumDare 28</span></div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mt-2">
                                <a href="LD27.php">
                                    <img src="/images/ld27.png" alt="27_Logo" width="224px" height="126px" />
                                    <div><span>Flash Memory</span></div>
                                    <div><span>LudumDare 27</span></div>
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