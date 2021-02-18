import React from 'react';

import { PageWrapper } from '../base/page-wrapper';

export function PizzaMan() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1> Pizza Man </h1>
                <p>
                    Pizza man was created as a test game before Ludum Dare and
                    is based off of the classic game of PAC-Man. Feel free to
                    download it and tell me how you enjoy it!
                </p>
                <a
                    href=""
                    onClick={() =>
                        window.open(
                            'http://www.mediafire.com/file/69blf3oc7a5bgpo/PizzaMan.jar'
                        )
                    }
                >
                    Download
                </a>
            </div>
        </PageWrapper>
    );
}
