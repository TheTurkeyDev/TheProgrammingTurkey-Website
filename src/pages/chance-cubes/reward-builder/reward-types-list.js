import React, { useState } from 'react';
import { RewardType } from './reward-type';

const colors = [
    '#61a11f',
    '#445f8b',
    '#a6142a',
    '#c1fda1',
    '#fd3bf1',
    '#3d9bf3',
    '#62b770',
    '#af2ea2',
];

export function RewardTypesList(props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className='m-2 container'
            style={{ border: `1px solid ${props.color}` }}
        >
            <div className='row m-2'>
                <h4>{props.type} Events</h4>
                <div
                    className='ml-auto'
                    onClick={() => setCollapsed((old) => !old)}
                >
                    {collapsed && (
                        <i className='clickable fas fa-chevron-left' />
                    )}
                    {!collapsed && (
                        <i className='clickable fas fa-chevron-down' />
                    )}
                </div>
                <div className='ml-3' onClick={() => props.deleteRewardType()}>
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
            {props.json.map((json, id) => {
                return (
                    <div
                        key={id}
                        className={`row m-2 ${collapsed ? 'hidden' : ''}`}
                    >
                        <RewardType
                            json={json}
                            color={colors[id % colors.length]}
                            settings={props.settings}
                            setRewardTypeState={(blockJson) =>
                                props.changeRewardTypeValue(id, blockJson)
                            }
                            delete={() => props.deleteRewardTypeIndex(id)}
                        />
                    </div>
                );
            })}

            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <button
                    className='ml-2 mt-2'
                    onClick={() => props.insetRewardTypetoJson()}
                >
                    Add {props.type} Event
                </button>
            </div>
        </div>
    );
}
