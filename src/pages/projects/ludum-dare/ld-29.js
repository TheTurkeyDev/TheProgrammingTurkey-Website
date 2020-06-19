import React from "react";

import { PageWrapper } from "../../base/page-wrapper";

export function LD29() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Maze Sweeper</h1>
                <h3> For LudumDare 29! </h3>
                <p>
                    This game was made for ludum dare 29!
                    The object of the game is to solve the maze. Simple enough, but the maze is hidden
                    beneath the tiles! In order to solve the maze you have to click the tiles to reveal
                    the maze, but be careful because you only get a certain amount of clicks To reveal
                    the maze with! Due to new java policies and securities I was not able to make this
                    game an applet so there for you must download it. To run the game simply execute the
                    exe file in the zip.
                    </p>
                <div>
                    <a className="mr-1" href="https://www.dropbox.com/s/uw2inytg54vjke2/Turkey2349%20LD29.zip">
                        Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('http://ludumdare.com/compo/ludum-dare-29/?action=preview&uid=24562')}>
                        Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/Turkey2349/LudumDare29')}>
                        Source Code
                        </a>
                </div>
            </div >
        </PageWrapper >
    )
}