import React from 'react';

export function UserPlatformAccount(props) {
    const disabled = props.disabled ? props.disabled : false;
    const connected = props.accounts.filter((a) => a.platform === props.platform_name.toUpperCase()).length > 0;

    return (
        <div className="row m-0 mb-3">
            <div className="col" style={{ fontSize: '24px' }}>
                <i
                    className={`${props.icon} mr-1`}
                    style={{ color: props.color }}
                />
                <span className="ml-2">{props.platform_name}</span>
            </div>
            <button
                className="col"
                disabled={connected || disabled}
                style={{ width: '100px', fontSize: '24px' }}
                onClick={() => props.onClick()}
            >
                {disabled ? 'Coming Soon!' : (connected ? 'Connected!' : 'Connect')}
            </button>
        </div>
    );
}
