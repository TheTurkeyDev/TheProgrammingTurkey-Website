import React from 'react';

import { PageWrapper } from '../base/page-wrapper';

export function SlimeRancherIntegration() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">
                    Slime Rancher Twitch Twitch Integration
                </h1>
                <h3> Slime Rancher Mod </h3>
                <p>
                    This mod is made in conjunction with a few twitch
                    interfacing applications and allows streamers to add in game
                    based events that get triggered from Twitch events.
                </p>
                <p>Supported Game Events:</p>
                <ul className="list-group">
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Spawning objects
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Downgrading plots
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Inventory bomb
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Player stats edit
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Move/ Pushing the player
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Adjusting player's money
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Shoot the players gun
                    </li>
                    <li className="list-group-item bg-primary pt-0 pb-0">
                        Day / Night toggle
                    </li>
                </ul>
                <div className="mt-4">
                    <a
                        className="ml-1"
                        href="https://github.com/TheTurkeyDev/Slime-Rancher-Twitch-Integration"
                    >
                        Source Code
                    </a>
                </div>
            </div>
        </PageWrapper>
    );
}
