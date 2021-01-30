import React from 'react';
import { Link } from 'react-router-dom';

import { TopNav } from "./top-nav";

export function PageWrapper(props) {
    return (
        <div className="h-100 w-100 d-flex flex-column">
            <TopNav />
            <div id="main-content">
                {
                    props.parent &&
                    <div className="ml-2 mt-2 button" style={{ fontSize: "24px" }} >
                        <Link to={props.parent} >
                            <i className="fas fa-arrow-left mr-1" />
                            Back
                        </Link>
                    </div>
                }
                {props.children}
            </div>
        </div>
    );
}