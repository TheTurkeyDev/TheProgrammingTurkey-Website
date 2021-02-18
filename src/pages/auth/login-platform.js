import React from 'react';

export function LoginPlatform(props) {
    return (
        <div className="row w-100 m-0 mb-3">
            <a
                className="btn p-1 mx-auto"
                href={props.url}
                style={{
                    width: '250px',
                    fontSize: '24px',
                    color: '#ffffff',
                    backgroundColor: props.color,
                    border: '1px solid #d1d1d1',
                    borderRadius: '5px',
                    boxShadow: '3px 5px #111314',
                }}
            >
                <i
                    className={`col p-0 ${props.icon}`}
                    style={{ width: '25%' }}
                />
                <p
                    className="col p-0 m-0"
                    style={{ width: '75%', display: 'inline-block' }}
                >
                    {props.platform} Login
                </p>
            </a>
        </div>
    );
}
