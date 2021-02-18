import React from 'react';
import { PageWrapper } from './page-wrapper';

export function PageLoading() {
    return (
        <PageWrapper>
            <div className="spinner"></div>
            <div style={{ height: '50px' }} />
        </PageWrapper>
    );
}
