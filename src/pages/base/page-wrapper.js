import React from 'react';

import { TopNav } from "./top-nav";

export function PageWrapper(props) {
    return (
        <div className="h-100 w-100 d-flex flex-column">
            <TopNav />
            <div id="main-content">
                {props.children}
            </div>
        </div>
    );
}