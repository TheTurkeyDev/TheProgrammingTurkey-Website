import React from 'react';

import { PageWrapper } from "./base/page-wrapper";

export function Info() {
    return (
        <PageWrapper>
            <div className="text-center">
                <h2>Contact Me!</h2>
                <div>
                    <div>
                        <span>Email:</span>
                    </div>
                    <div>
                        <span>Turkey2349@gmail.com</span>
                    </div>
                </div>
                <h2 className="mt-3">Programming languages</h2>
                <div>
                    <span style={{ fontSize: "1.25rem", textDecoration: "underline" }}>
                        Familiar with
                        </span>
                    <div>Java</div>
                </div>
                <div className="mt-2">
                    <span style={{ fontSize: "1.25rem", textDecoration: "underline" }}>
                        Worked with a decent amount
                        </span>

                    <div>Python</div>
                    <div>JavaScript (React)</div>
                    <div>C#</div>
                    <div>HTML / css</div>
                    <div>C / Arduino</div>
                    <div>SQL</div>


                </div>
                <div className="mt-2">
                    <span style={{ fontSize: "1.25rem", textDecoration: "underline" }}>
                        Worked with a few times, but would need refreshers
                        </span>

                    <div>PHP</div>
                    <div>MatLab</div>
                </div>
            </div>
        </PageWrapper>
    );
}