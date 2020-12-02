import React from "react";

import { PageWrapper } from "../base/page-wrapper";

export function LD37() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Hedge Maze Overlord</h1>
                <h3> For LudumDare 37! </h3>
                <p>
                    This game was made for ludum dare 37!
                    After not participation in the previous Ludum Dare, I decided to atleast make a game for this while
                    while in between college finals studying sessions. Making this game mainly helped me take a break
                    from all that was going on and somewhat take a small relaxing break..... sort of. At any rate I ended
                    up making this Hedge Maze Overlord, using the LibGDX frame work yet again and due to my limited amount
                    of time much of the game was put together using code and stuff that I have previously made and now
                    include in my hodge podge libGDX api of sorts. None the less, the game was made and is now available
                    to play!

                    </p>
                <div>
                    <a className="mr-1" href="https://www.dropbox.com/s/5f02bok8gu5e6ow/HedgeMazeOverlord48Version.jar?dl=0">
                        Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('http://ludumdare.com/compo/ludum-dare-35/?action=preview&uid=24562')}>
                        Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/TheTurkeyDev/LudumDare37')}>
                        Source Code
                        </a>
                </div>
                <div className="mt-3">
                    <h1>TimeLapse!</h1>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/T-ytFpeOGYk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div >
        </PageWrapper >
    )
}