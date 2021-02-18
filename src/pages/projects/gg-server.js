import React from 'react';

import { PageWrapper } from '../base/page-wrapper';

export function GGServer() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <div>
                    <h1>GGServer</h1>
                    <h4>(Gobble Google Server)</h4>
                    <h4>A Google FCM Server</h4>
                </div>
                <p>
                    GGServer is server tool that allows the creation of services
                    that can be loaded into the server to preform tasks or
                    services that are able to utilize googles cloud messaging.
                </p>
                <h2 className="mt-3">Current Working example:</h2>
                <p>
                    I currently have an instance of GGServer running on a
                    raspberry pi that has several services loaded. One is a
                    Twitch bot that sits in serval channels that I frequent. The
                    bot, or service, listens for certain key words and when one
                    of the is said, the service usese GGServer to relay a
                    message and notification to an app that I have build for my
                    phone (Which uses Google FCM) so that I recieve the
                    notification and details of what was said.
                </p>
                <div>
                    <a href="https://github.com/TheTurkeyDev/GGServer">
                        GGServer Repository
                    </a>
                </div>
                <div>
                    <a href="https://github.com/TheTurkeyDev/TurkeyBot-Lurk">
                        Twitch Service Repository
                    </a>
                </div>
                <div>
                    <a href="https://github.com/TheTurkeyDev/TurkeyBot-Reddit">
                        Reddit Comment Scanner Repository
                    </a>
                </div>
                <p>If this project gains popularity I'll add more here.</p>
            </div>
        </PageWrapper>
    );
}
