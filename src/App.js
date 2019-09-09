import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PageWrapper from "./pages/base/page-wrapper";

class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PageWrapper>
                <div className="text-center">
                    <div className="card m-5 shadow">
                        <div className="card-body">
                            <h5 className="card-title">Whats Going on Here?</h5>
                            <p className="card-text">
                                I'm currently in the middle of revamping my website!
                                It was previously written with a very bad mix of php and html with w3css for css organization.
                                Let's just say it wasn't all that great and a bit of a nightnare to work with and update.
                                Now I am redoing it all with React and bootstrap! Why react? Well I'm learning it to work with it on another
                                project, so I'm using it here to aid in my testing and learning.
                                The source code for my website is actually available to everyone
                                <a href="https://github.com/Turkey2349/TheProgrammingTurkey-Website"> on my Github page!</a>
                            </p>

                            <p className="card-text">
                                Not all pages and links are currently avaiable and over time I will slowly be adding everything back.
                                    Please be patient with me!
                            </p>
                        </div>
                    </div>
                    <div className="card m-5 shadow">
                        <div className="card-body">
                            <h5 className="card-title">Weebsite To-Do List</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Dark Theme</li>
                                <li class="list-group-item">Game/ Project Pages</li>
                                <li class="list-group-item">Twitch View</li>
                                <li class="list-group-item">Test Section</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card m-5 shadow">
                        <div className="card-body">
                            <h5 className="card-title">Ludum Dare 39!</h5>
                            <h6 className="card-subtitle">That's a wrap!</h6>
                            <p className="card-text">
                                Well another Ludum Dare has come and passed.
                                Check out the links below for the game, main Ludum Dare page, and stats about past Ludum Dare game placements
                            </p>
                        </div>

                        <div className="card-footer">
                            <Link className="mr-2" to="/LD39">Game</Link>
                            <span>|</span>
                            <a className="ml-2 mr-2" href="/ldjam.com">Ludum Dare</a>
                            <span>|</span>
                            <Link className="ml-2" to="/ld-stats">Stats</Link>
                        </div>
                    </div>
                </div>
            </PageWrapper >
        );
    }
}

export default App;