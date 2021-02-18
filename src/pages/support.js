import React from 'react';
import { PageWrapper } from './base/page-wrapper';

export function Support() {
    return (
        <PageWrapper>
            <div className="m-3">
                <div className="text-center">
                    <h1>Support Me</h1>
                </div>
                <div className="m-3 fluid-container">
                    <div className="row mx-auto" style={{ maxWidth: '700px' }}>
                        <p>
                            I appreciate you thinking about supporting me and my
                            efforts! I love making things for all of you to use
                            and I do my best to offer as much as I can for free!
                        </p>
                        <p>
                            Below is a list of ways you can support me, both
                            monitarily and non-monitarily!
                        </p>
                    </div>
                    <div className="row mx-auto" style={{ maxWidth: '700px' }}>
                        <a
                            className="col mr-1 mt-2 mx-auto anti-a-white"
                            style={{
                                minWidth: '300px',
                                maxWidth: '300px',
                                minHeight: '50px',
                                height: '50px',
                                backgroundColor: '#6441a5',
                            }}
                            href="https://www.twitch.tv/turkeydev/subscribe"
                        >
                            <div className="fluid-container row h-100">
                                <div className="col-auto my-auto ml-3">
                                    <i
                                        className="fab fa-twitch text-light"
                                        style={{ fontSize: '28px' }}
                                    />
                                </div>
                                <div className="col p-0 my-auto mx-auto">
                                    <span
                                        className="text-light"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '28px',
                                        }}
                                    >
                                        Subscribe
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a
                            className="col mr-1 mt-2 mx-auto anti-a-white"
                            style={{
                                minWidth: '300px',
                                maxWidth: '300px',
                                minHeight: '50px',
                                height: '50px',
                                backgroundColor: '#f96854',
                            }}
                            href="https://www.patreon.com/TurkeyDev"
                        >
                            <div className="fluid-container row h-100">
                                <div className="col-auto my-auto ml-3">
                                    <i
                                        className="fab fa-patreon text-light"
                                        style={{ fontSize: '28px' }}
                                    />
                                </div>
                                <div className="col p-0 my-auto mx-auto">
                                    <span
                                        className="text-light"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '22px',
                                        }}
                                    >
                                        BECOME A PATREON
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a
                            className="col mr-1 mt-2 mx-auto anti-a-white"
                            style={{
                                minWidth: '300px',
                                maxWidth: '300px',
                                minHeight: '50px',
                                height: '50px',
                                backgroundColor: '#333',
                            }}
                            href="https://github.com/sponsors/TheTurkeyDev"
                        >
                            <div className="fluid-container row h-100">
                                <div className="col-auto my-auto ml-3">
                                    <i
                                        className="fab fa-github text-light"
                                        style={{ fontSize: '28px' }}
                                    />
                                </div>
                                <div className="col p-0 my-auto mx-auto">
                                    <span
                                        className="text-light"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '28px',
                                        }}
                                    >
                                        Sponsor Me
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a
                            className="col mr-1 mt-2 mx-auto anti-a-white"
                            style={{
                                minWidth: '300px',
                                maxWidth: '300px',
                                minHeight: '50px',
                                height: '50px',
                                backgroundColor: '#00457C',
                            }}
                            href="https://paypal.me/turkey2349"
                        >
                            <div className="fluid-container row h-100">
                                <div className="col-auto my-auto ml-3">
                                    <i
                                        className="fab fa-paypal text-light"
                                        style={{ fontSize: '28px' }}
                                    />
                                </div>
                                <div className="col p-0 my-auto mx-auto">
                                    <span
                                        className="text-light"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '28px',
                                        }}
                                    >
                                        Donate
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div
                        className="row mt-3 mx-auto"
                        style={{ maxWidth: '700px' }}
                    >
                        <p>
                            Don't have any change to spare? No worries! Support
                            me non-monitarily by following me and checking out
                            my content below!
                        </p>
                    </div>
                    <div
                        className="row mt-3 mx-auto"
                        style={{ maxWidth: '700px' }}
                    >
                        <a
                            className="col anti-a-white"
                            href="https://theturkey.dev/youtube"
                        >
                            <i
                                className="fab fa-youtube text-light"
                                style={{ fontSize: '64px' }}
                            />
                        </a>
                        <a
                            className="col anti-a-white"
                            href="https://theturkey.dev/twitch"
                        >
                            <i
                                className="fab fa-twitch text-light"
                                style={{ fontSize: '64px' }}
                            />
                        </a>
                        <a
                            className="col anti-a-white"
                            href="https://theturkey.dev/github"
                        >
                            <i
                                className="fab fa-github text-light"
                                style={{ fontSize: '64px' }}
                            />
                        </a>
                        <a
                            className="col anti-a-white"
                            href="https://theturkey.dev/twitter"
                        >
                            <i
                                className="fab fa-twitter text-light"
                                style={{ fontSize: '64px' }}
                            />
                        </a>
                        <a
                            className="col anti-a-white"
                            href="https://theturkey.dev/instagram"
                        >
                            <i
                                className="fab fa-instagram text-light"
                                style={{ fontSize: '64px' }}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
