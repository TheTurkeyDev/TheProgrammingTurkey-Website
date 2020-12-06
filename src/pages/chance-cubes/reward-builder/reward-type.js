import React, { useContext, useState } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';

export function RewardType(props) {
    const overlay = useContext(OverlayContext);

    const [collapsed, setCollapsed] = useState(false);

    const changeValue = (valueKey, value) => {
        const json = { ...props.json };
        json[valueKey] = value;
        props.setRewardTypeState(json);
    }

    const settings = props.settings;

    return (
        <div className="m-2 container" style={{ border: `1px solid ${props.color}` }}>
            <div className="row">
                <div className="col-auto ml-auto" onClick={() => setCollapsed(old => !old)}>
                    {collapsed && <i className="fas fa-chevron-left" />}
                    {!collapsed && <i className="fas fa-chevron-down" />}
                </div>
                <div className="col-auto" onClick={() => { }}>
                    <i className="clickable fas fa-trash" />
                </div>
            </div>
            {
                !collapsed &&
                settings.map((setting, i) => {
                    if (setting.type === "number") {
                        return (
                            <div key={i} className="row m-2">
                                <label className="col-3 timer-label">{setting.display}:</label>
                                <input className="col-9" style={{ maxWidth: "250px" }} type="number" value={props.json[setting.key]} onChange={(e) => changeValue(setting.key, parseInt(e.target.value))} />
                            </div>
                        );
                    }
                    else if (setting.type === "text") {
                        return (
                            <div key={i} className="row m-2">
                                <label className="col-3 timer-label">{setting.display}:</label>
                                <input className="col-9" style={{ maxWidth: "250px" }} type="text" value={props.json[setting.key]} onChange={(e) => changeValue(setting.key, e.target.value)} />
                            </div>
                        );
                    }
                    else if (setting.type === "boolean") {
                        return (
                            <div key={i} className="row m-2">
                                <label className="col-3 timer-label">{setting.display}:</label>
                                <div className="toggle-switch">
                                    <input type="checkbox" checked={props.json[setting.key]} onChange={() => { }} />
                                    <span className="toggle-slider round" onClick={() => changeValue(setting.key, !props.json[setting.key])}></span>
                                </div>
                            </div>
                        );
                    }
                })
            }
            {
                collapsed &&
                <div className="row m-2" style={{ overflowX: "hidden" }}>
                    <span>{JSON.stringify(props.json)}</span>
                </div>
            }
        </div>
    )
}