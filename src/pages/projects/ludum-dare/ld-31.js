import React from "react";

import { PageWrapper } from "../../base/page-wrapper";

export function LD31() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Game Evolution</h1>
                <h3> For LudumDare 31! </h3>
                <p>
                    This game was made for ludum dare 31!
                    Welcome to Game Evolution! What is Game Evolution you may ask? Well Game evolution was made
                    in 48 hours (Only about 10 actual hours of development in that 48 hour window) and combines
                    a few of the the first arcade games that we know. The object of the game is to simply beat
                    each arcade game and move onto the next!
                    </p>
                <div>
                    <a className="mr-1" href="https://www.dropbox.com/s/wllmok9e5gs28zq/LD31.jar?dl=0">
                        Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('http://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=24562')}>
                        Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/Turkey2349/LudumDare31')}>
                        Source Code
                        </a>
                </div>
            </div >
        </PageWrapper >
    )
}