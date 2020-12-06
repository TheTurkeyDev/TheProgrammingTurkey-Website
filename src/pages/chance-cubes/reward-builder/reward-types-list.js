import React, { useContext, useState } from 'react';
import { RewardType } from './reward-type';

const colors = ["#61a11f", "#445f8b", "#a6142a", "#c1fda1", "#fd3bf1", "#3d9bf3", "#62b770", "#af2ea2"];


export function RewardTypesList(props) {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="m-2 container" style={{ border: `1px solid #06f0fa` }}>
            <div className="row m-2">
                <h4>{props.type} Events</h4>
                <div className="ml-auto" onClick={() => setCollapsed(old => !old)}>
                    {collapsed && <i className="clickable fas fa-chevron-left" />}
                    {!collapsed && <i className="clickable fas fa-chevron-down" />}
                </div>
                <div className="ml-3" onClick={() => { }}>
                    <i className="clickable fas fa-trash" />
                </div>
            </div>
            {
                !collapsed &&
                props.json.map((json, id) => {
                    return (
                        <RewardType key={id} json={json} color={colors[id % colors.length]} settings={props.settings} setRewardTypeState={(blockJson) => props.changeRewardTypeValue(props.type, id, blockJson)} />
                    );
                })
            }
            {
                !collapsed &&
                <button className="ml-2 mt-2" onClick={() => props.insetRewardTypetoJson(props.type)}>Add {props.type} Event</button>
            }
        </div>
    );
}
