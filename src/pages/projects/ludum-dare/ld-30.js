import React, { Component } from "react";

import PageWrapper from "../../base/page-wrapper";

class LD30 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageWrapper>
                <div className="text-center mr-5 ml-5">
                    <h1 className="mt-2">World Swap</h1>
                    <h3> For LudumDare 30! </h3>
                    <p>
                        This game was made for ludum dare 30!
                        This is World Swap! The point of the game is to solve each level by swapping between 2
                        worlds! Some things to note: the beginning tile is safe on both worlds, so you can freely
                        swap between worlds on those tiles. Hope you guys enjoy the game! Time Lapse coming soon!
                    </p>
                    <div>
                        <ul>
                            Some help full tips:
                            <li>
                                Pressing shift in the level select will unlock all of the levels if you want to play them that way
                            </li>
                            <li>
                                There are also a few Easter eggs! See if you can find them!
                            </li>
                        </ul>
                    </div>
                    <div>
                        <a className="mr-1" href="http://www.mediafire.com/download/prpdq6htmbaamv9/LudumDare30.jar">
                            Download
                        </a>
                        |
                        <a className="ml-1 mr-1" href="" onClick={() => window.open('http://ludumdare.com/compo/ludum-dare-30/?action=preview&uid=24562')}>
                            Ludum Dare Page
                        </a>
                        |
                        <a className="ml-1" href="" onClick={() => window.open('https://github.com/Turkey2349/LudumDare30')}>
                            Source Code
                        </a>
                    </div>
                    <div className="mt-3">
                        <h1>TimeLapse!</h1>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/24gAKppkGe0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div >
            </PageWrapper >
        )
    }
}

export default LD30;