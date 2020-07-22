import React from "react";

import { PageWrapper } from "../../base/page-wrapper";

export function WitherCrumbs() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Headcrumbs</h1>
                <h3> Minecraft Mod </h3>
                <p>
                    Withercrumbs is an addon mod to the Headcrumbs mod that adds reskins the Wither boss to various
                    player's skins. The original idea from the mod came from the Twitch Streamer Wyld and was built
                    as a entertainment type aspect to make the withers more fun to play around with. This mod is also
                    the reason I maintain the Headcrumbs mod.
                    </p>
                <div>
                    <a className="mr-1" href="https://www.curseforge.com/minecraft/mc-mods/withercrumbs">
                        Info Page and Download
                        </a>
                        |
                        <a className="ml-1" href="https://github.com/TheTurkeyDev/WitherCrumbs">
                        Source Code
                        </a>
                </div>
            </div>
        </PageWrapper >
    )
}