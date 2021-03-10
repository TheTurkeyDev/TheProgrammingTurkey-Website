import React from 'react';
import { Link } from 'react-router-dom';

export function ProfileProjectLink({ app }) {
    return (
        <div className='col mx-2 mb-3 p-0 pt-2 bg-secondary project-link' style={{ minWidth: '200px', maxWidth: '200px', width: '200px', height: '200px', borderRadius: '10px', overflowY: 'hidden' }}>
            <Link to={app.link} style={{ textDecoration: 'none' }}>
                <div className='text-light my-auto'>
                    <i className={app.icon} style={{ fontSize: '128px' }} />
                </div>
                <div className='mb-2 project-link-title' style={{ zIndex: 1, position: 'relative', background: '#333333', minHeight: '75px', bottom: '0px' }}>
                    <span style={{ fontSize: '20px' }}>
                        {app.title}
                    </span>
                </div>
            </Link>
        </div>
    );
}