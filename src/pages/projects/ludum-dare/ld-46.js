import React from "react";

import { PageWrapper } from "../../base/page-wrapper";

export function LD46() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Turkey's Plant Emporium</h1>
                <h3> For LudumDare 46! </h3>
                <p>
                    This game was made for ludum dare 46!
                    It's been awhile.... Like awhile awhile sine I've done a Ludum Dare, but I finally got around to doing another one!
                    Life has been all over the place. COVID-19 currently has my state under a stay at home order and to top it off, I'm
                    graduating college in less than 2 weeks from the time of completing this game. Sounds like a great time to make a
                    Ludum Dare game! This time was special too as I completed this game in a team with SpaceMyName who made the art
                    assets and sounds!
                    </p>
                <div>
                    <a className="mr-1" href="http://files.theprogrammingturkey.com/index.html?path=ludm_dare/turkeys_plant_emporium_72_hr.jar">
                        Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('https://ldjam.com/events/ludum-dare/46/turkeys-plant-emporium')}>
                        Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/Turkey2349/LudumDare46')}>
                        Source Code
                        </a>
                </div>
                <div className="mt-3">
                    <h1>TimeLapse!</h1>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/S_9nnH3hBDA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div >
        </PageWrapper >
    )
}