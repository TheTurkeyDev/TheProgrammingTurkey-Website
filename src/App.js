import React, { Component } from 'react';

import PageWrapper from "./pages/base/page-wrapper";

class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PageWrapper>
                <div className="text-center">
                    <h1> Whats Going on Here?</h1>
                    <p>
                        I'm currently in the middle of revamping my website!
                        It was previously written with a very bad mix of php and html with w3css for css organization.
                        Let's just say it wasn't all that great and a bit of a nightnare to work with and update.
                        Now I am redoing it all with React and bootstrap! Why react? Well I'm learning it to work with it on another
                        project, so I'm using it here to aid in my testing and learning.
                        The source code for my website is actually available to everyone
                        <a href="https://github.com/Turkey2349/TheProgrammingTurkey-Website"> on my Github page!</a>
                    </p>
                    <p>
                        Not all pages and links are currently avaiable and over time I will slowly be adding everything back.
                        Please be patient with me!
                    </p>
                </div>
            </PageWrapper >
        );
    }
}

export default App;