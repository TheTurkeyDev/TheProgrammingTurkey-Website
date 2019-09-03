import React, { Component } from 'react';

import PageWrapper from "./base/page-wrapper";

class Info extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PageWrapper>
                <span>HI Info!</span>
            </PageWrapper>
        );
    }
}

export default Info;