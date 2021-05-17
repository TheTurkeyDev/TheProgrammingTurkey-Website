import { useState } from 'react';
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

export const RewardTypesList = ({ json, color, type, settings, insetRewardTypetoJson, changeRewardTypeValue, deleteRewardType, deleteRewardTypeIndex }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className='m-2 container'
            style={{ border: `1px solid ${color}` }}
        >
            <div className='row m-2'>
                <h4>{type} Events</h4>
                <div
                    className='ml-auto'
                    onClick={() => setCollapsed(old => !old)}
                >
                    {collapsed ?
                        <i className='clickable fas fa-chevron-left' /> :
                        <i className='clickable fas fa-chevron-down' />
                    }
                </div>
                <div className='ml-3' onClick={() => deleteRewardType()}>
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
            {json.map((json, id) => {
                return (
                    <div
                        key={id}
                        className={`row m-2 ${collapsed ? 'hidden' : ''}`}
                    >
                        <RewardType
                            json={json}
                            color={colors[id % colors.length]}
                            settings={settings}
                            setRewardTypeState={blockJson => changeRewardTypeValue(id, blockJson)}
                            deleteRewardType={() => deleteRewardTypeIndex(id)}
                        />
                    </div>
                );
            })}

            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <button
                    className='ml-2 mt-2'
                    onClick={() => insetRewardTypetoJson()}
                >
                    Add {type} Event
                </button>
            </div>
        </div>
    );
}
