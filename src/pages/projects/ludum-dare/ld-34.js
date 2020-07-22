import React from "react";

import { PageWrapper } from "../../base/page-wrapper";

export function LD34() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Turkeyconn Simulator 2016</h1>
                <h3> For LudumDare 34! </h3>
                <p>
                    This game was made for ludum dare 34!
                    Turkeyconn Simulator 2016 was my eigth Ludum Dare game and third using the LibGDX game library!
                    This game revolves around you managing your smart phone producing factory! Controll workers to
                    train, build and manage machines to help you make the most product. Each machine has it's own
                    function in the phone making process and require workers to transport each machines raw materials
                    for further use. For more information read the in game help screen. Hope you guys enjoy this game!
                    </p>
                <div>
                    <a className="mr-1" href="https://www.dropbox.com/s/0dvnlsvj4rzwt85/Turkeyconn%20Sim%20LD34.jar?dl=0&preview=Turkeyconn+Sim+LD34.jar">
                        Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('http://ludumdare.com/compo/ludum-dare-34/?action=preview&uid=24562')}>
                        Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/TheTurkeyDev/LudumDare34')}>
                        Source Code
                        </a>
                </div>
                <div className="mt-3">
                    <h1>TimeLapse!</h1>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/01lhNBa5Mno" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div >
        </PageWrapper >
    )
}