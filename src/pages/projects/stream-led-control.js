import React from 'react';

import { PageWrapper } from '../base/page-wrapper';

export function StreamLEDControl() {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Twitch Chat Controlled LED Strip</h1>
                <p>
                    The LED's you see in the background of my stream are fully
                    controllable by my Twitch chat! Below you will find all the
                    ways in which you can controll the led strip as well as
                    other information about the project
                </p>
                <div className='mt-3'>
                    <h4>
                        Video about how I made the Stream Controlled LED Strip
                    </h4>
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/0M-tHoVeetI'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        style={{ border: '2px solid #d1d1d1' }}
                    ></iframe>
                </div>
                <div>
                    <a
                        className='ml-1 mr-1'
                        href=''
                        onClick={() =>
                            window.open(
                                'https://github.com/TheTurkeyDev/LED-Strip-Stream-Integration'
                            )
                        }
                    >
                        Source Code
                    </a>
                </div>
                <hr style={{ borderColor: '#757c85' }} />
                <h2 className='mt-5 font-weight-bold'>
                    Controlling the LED strip
                </h2>
                <div
                    className='mt-3 mx-auto text-left'
                    style={{ maxWidth: '500px' }}
                >
                    <hr style={{ borderColor: '#757c85' }} />
                    <div className='mt-3'>
                        <div className='ml-2 w-100 h-100'>
                            <span style={{ fontSize: '18px' }}>
                                Valid Colors:
                            </span>
                            <p className='code p-3'>
                                red, blue, green, yellow, orange, pink, purple,
                                cyan, white, black
                            </p>
                        </div>
                    </div>
                    <hr style={{ borderColor: '#757c85' }} />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Solid Color</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <span style={{ fontSize: '18px' }}>Syntax:</span>
                            <p className='code p-3'>[Hex/ Color]</p>
                            <span style={{ fontSize: '18px' }}>Examples:</span>
                            <p className='code p-3'>#FF0000</p>
                            <p className='code p-3'>red</p>
                        </div>
                    </div>
                    <hr style={{ borderColor: '#757c85' }} />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Rainbow</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <span style={{ fontSize: '18px' }}>Syntax:</span>
                            <p className='code p-3'>rainbow</p>
                        </div>
                    </div>
                    <hr style={{ borderColor: '#757c85' }} />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Color Blocks</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <span style={{ fontSize: '18px' }}>Syntax:</span>
                            <p className='code p-3'>
                                colorblocks [Hex /Color] (...Repeat as much as
                                desired)
                            </p>
                            <span style={{ fontSize: '18px' }}>Examples:</span>
                            <p className='code p-3'>
                                colorblocks #FF0000 #00FF00 #0000FF
                            </p>
                            <p className='code p-3'>
                                colorblocks #FF0000 #00FF00 #0000FF #FFFF00
                                #00FFFF
                            </p>
                            <p className='code p-3'>
                                colorblocks red #00FF00 blue orange #00FFFF
                            </p>
                        </div>
                    </div>
                    <hr style={{ borderColor: '#757c85' }} />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Alternating Colors</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <span style={{ fontSize: '18px' }}>Syntax:</span>
                            <p className='code p-3'>
                                coloralternate [Hex /Color] (...Repeat as much
                                as desired)
                            </p>
                            <span style={{ fontSize: '18px' }}>Examples:</span>
                            <p className='code p-3'>
                                coloralternate #FF0000 #00FF00 #0000FF
                            </p>
                            <p className='code p-3'>
                                coloralternate #FF0000 #00FF00 #0000FF #FFFF00
                                #00FFFF
                            </p>
                            <p className='code p-3'>
                                coloralternate red #00FF00 blue orange #00FFFF
                            </p>
                        </div>
                    </div>
                    <hr style={{ borderColor: '#757c85' }} />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Police</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <span style={{ fontSize: '18px' }}>Syntax:</span>
                            <p className='code p-3'>police</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper >
    );
}
