import React from 'react';

import { PageWrapper } from '../base/page-wrapper';

export function LD33() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">God-Kill-A</h1>
                <h3> For LudumDare 33! </h3>
                <p>
                    This game was made for ludum dare 33! God-Kill-A was made in
                    Java just like the previous 6 games and this is also the
                    second game to use the LibGDX game library. The Game centers
                    around you being God-Zil-A, terrorizing the town. Your goal
                    is to stomp, burn, a demolish as much o9f the approaching
                    millitary as you can! The game is round/level based and gets
                    harder as the game progresses. How long can you survive?
                </p>
                <div>
                    <a className="mr-1" href="https://www.dropbox.com/s/uf6jy3n7zm76o8s/GodKillA_%28LD33%29.jar?dl=0">
                        Download
                    </a>
                    |
                    <a
                        className="ml-1 mr-1"
                        href=""
                        onClick={() =>
                            window.open(
                                'http://ludumdare.com/compo/ludum-dare-33/?action=preview&uid=24562'
                            )
                        }
                    >
                        Ludum Dare Page
                    </a>
                    |
                    <a
                        className="ml-1"
                        href=""
                        onClick={() =>
                            window.open(
                                'https://github.com/TheTurkeyDev/LudumDare33'
                            )
                        }
                    >
                        Source Code
                    </a>
                </div>
                <div className="mt-3">
                    <h1>TimeLapse!</h1>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/Dq9RVRzxaWs"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </PageWrapper>
    );
}
