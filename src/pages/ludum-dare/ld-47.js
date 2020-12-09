import React from "react";

import { PageWrapper } from "../base/page-wrapper";

export function LD47() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">A Timed Loop</h1>
                <h3> For LudumDare 47! </h3>
                <p>
                    My first game ludum dare where I made a game and didn't program it in Java! This time around we gave C#
                    and Monogame a shot! Overall, I thought it went well. For once, I actually didn't overscope. On the other
                    hand though, I think that the game lacked features and had a very small feature set. Art and sounds were
                    good this time, better than past attempts in my opinion. End of the day, I feel good and I think that
                    this is one of my more complete and fluid games I've made.
                </p>
                <p>
                    So C# or Java? LibGDX or Monogame? Well.... I still like Java a bit more, but honestly Monogame was much
                    better... Not sure what I'll use going forward.
                </p>
                <div>
                    <a className="mr-1" href="https://turkeydev.itch.io/a-timed-loop">
                        Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('https://ldjam.com/events/ludum-dare/47/a-timed-loop')}>
                        Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/TheTurkeyDev/LudumDare47')}>
                        Source Code
                        </a>
                </div>
                <div className="mt-3">
                    <h1>TimeLapse!</h1>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/R-_M3WDOAuQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div >
        </PageWrapper >
    )
}