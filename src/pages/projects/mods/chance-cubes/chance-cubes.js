import React, { Component } from "react";
import { Link } from "react-router-dom";

import PageWrapper from "../../../base/page-wrapper";

class ChanceCubesMC extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageWrapper>
                <div className="text-center mr-5 ml-5">
                    <h1 className="mt-2">Chance Cubes</h1>
                    <h3> Minecraft Mod </h3>
                    <p>
                        Chance Cubes is a mod that I started as my first major modding project after moving over from Bukkit plugins.
                        Chance Cubes is a RNG based mod that has both good and bad rewards that occur when you break a Chance Cubes block.
                        The Idea for the mod started in as a replacement for the mod Lucky Blocks after it's terms of use prevented it
                        from being used in public mod packs. While the original premise of the mod remains, I have slowly been adding my own
                        twists and ideas to the mod as it develops.
                    </p>
                    <div>
                        <a className="mr-1" href="https://www.curseforge.com/minecraft/mc-mods/chance-cubes">
                            Info Page and Download
                        </a>
                        |
                        <a className="ml-1" href="https://github.com/Turkey2349/ChanceCubes">
                            Source Code
                        </a>
                        |
                        <Link className="ml-1 mr-1" to="/chancecubes/stats">
                            Stats
                        </Link>
                    </div>
                    <div className="mt-5" style={{ textDecoration: "underline" }}>
                        <h3>Rewards, Clips, and Gameplay Videos</h3>
                    </div>
                    <div className="mt-2">
                        <a className="ml-1" href="https://www.youtube.com/watch?v=zxzvBvMB0qQ">
                            Village Construction Reward
                        </a>
                    </div>
                    <div className="mt-2">
                        <a className="ml-1" href="https://www.youtube.com/watch?v=CMjavS2m2Tw">
                            Math Reward
                        </a>
                    </div>
                    <div className="mt-2">
                        <a className="ml-1" href="https://www.youtube.com/watch?v=VdiEjBlgbTs">
                            Giant Chance Cube and Bio Dome
                        </a>
                    </div>
                    <div className="mt-2">
                        <a className="ml-1" href="https://clips.twitch.tv/BenevolentGoldenClipsmomChocolateRain">
                            Sketch - Leonidas Reward
                        </a>
                    </div>
                    <div className="mt-2">
                        <a className="ml-1" href="https://clips.twitch.tv/PopularBoredEelFunRun">
                            Tic-Tac-Toe Reward
                        </a>
                    </div>
                </div >
            </PageWrapper >
        )
    }
}

export default ChanceCubesMC;