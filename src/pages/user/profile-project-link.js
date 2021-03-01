import React from 'react';
import { Link } from 'react-router-dom';

export function ProfileProjectLink(params) {
    return (
        <div className='col mx-1 p-0 bg-secondary project-link' style={{ width: '200px', height: '200px', borderRadius: '10px', overflowY: 'hidden' }}>
            <Link to={params.link} style={{ textDecoration: 'none' }}>
                <div className='text-light my-auto'>
                    <i className='fas fa-stopwatch-20' style={{ fontSize: '128px' }} />
                </div>
                <div className='mb-2 project-link-title' style={{ zIndex: 1, position: 'relative', background: '#333333', minHeight: '75px', bottom: '0px' }}>
                    <span style={{ fontSize: '20px' }}>
                        {params.title}
                    </span>
                </div>
            </Link>
        </div>
    );
}