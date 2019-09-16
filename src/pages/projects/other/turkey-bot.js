import React, { Component } from "react";

import PageWrapper from "../../base/page-wrapper";

class TurkeyBot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageWrapper>
                <div className="text-center mr-5 ml-5">
                    <div>
                        <h1>TurkeyBot</h1>
                        <h4> A Twitch chat moderation bot</h4>
                    </div>
                    <p>
                        TurkeyBot is a chat bot that allows for moderation of Twitch chats as well as provides helpful tools for the caster to use to allow for more efficiency.
					</p>
                    <h2>Some of these tools include:</h2>
                    <div>
                        <ul className="list-group">
                            {
                                ["Commands", "Auto-Announcements", "Raffle system", "Points system", "Multi-response commands",
                                    "Follower notification and tracker", "Current viewer stats", "Custom in channel bot name",
                                    "Custom chat moderation", "In-chat mini-games"].map((item, index) => {
                                        return (
                                            <li key={index} className="list-group-item">
                                                {item}
                                            </li>
                                        )
                                    })
                            }
                        </ul>
                    </div>
                    <p>
                        Latest version:
                        <a href="" onClick={() => window.open('https://www.dropbox.com/s/y0xxgk2bod7t9fq/TurkeyBot%20v2.0.1%20Beta.jar?dl=0')}> Download</a >
                    </p>
                    <p>
                        If you are using my bot in your chat let me know and I will be sure to stop by and say hello!
                    </p>
                </div >
            </PageWrapper >
        )
    }
}

export default TurkeyBot;