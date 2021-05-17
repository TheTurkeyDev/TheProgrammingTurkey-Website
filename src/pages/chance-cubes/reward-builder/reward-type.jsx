import { useContext, useState } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ConfirmationOverlay } from '../../../overlays/confirmation-overlay';

export const RewardType = ({ json, settings, color, setRewardTypeState, deleteRewardType }) => {
    const overlay = useContext(OverlayContext);

    const [collapsed, setCollapsed] = useState(false);

    const changeValue = (setting, value) => {

        if (setting.min || setting.min === 0)
            value = Math.max(value, setting.min);
        if (setting.max || setting.max === 0)
            value = Math.min(value, setting.max);

        const jsonCopy = { ...json };
        jsonCopy[setting.key] = value;
        setRewardTypeState(jsonCopy);
    }

    const deleteInstance = () => {
        overlay.pushCurrentOverlay(<ConfirmationOverlay text={'Are you sure you want to delete this event?'} options={
            [
                { text: 'Yes', callback: () => { overlay.popCurrentOverlay(); deleteRewardType(); } },
                { text: 'No', callback: () => overlay.popCurrentOverlay() }
            ]
        } />);
    }

    const getInput = (setting) => {
        if (setting.type === 'number') {
            return (
                <input className='col-9' style={{ maxWidth: '250px' }} type='number' value={json[setting.key]} onChange={(e) => changeValue(setting, parseInt(e.target.value))} />
            );
        }
        else if (setting.type === 'decimal') {
            return (
                <input className='col-9' style={{ maxWidth: '250px' }} type='number' step='0.01' value={json[setting.key]} onChange={(e) => changeValue(setting, parseFloat(e.target.value))} />
            );
        }
        else if (setting.type === 'text') {
            return (
                <input className='col-9' style={{ maxWidth: '250px' }} type='text' value={json[setting.key]} onChange={(e) => changeValue(setting, e.target.value)} />
            );
        }
        else if (setting.type === 'boolean') {
            return (
                <div className='toggle-switch'>
                    <input type='checkbox' checked={json[setting.key]} onChange={() => { }} />
                    <span className='toggle-slider round' onClick={() => changeValue(setting, !json[setting.key])}></span>
                </div>
            );
        }
    }

    return (
        <div className='m-2 container pb-3' style={{ border: `1px solid ${color}` }}>
            <div className='row mt-2'>
                <div className='col-auto ml-auto' onClick={() => setCollapsed(old => !old)}>
                    {
                        collapsed ? <i className='fas fa-chevron-left' /> : <i className='fas fa-chevron-down' />
                    }
                </div>
                <div className='col-auto' onClick={() => deleteInstance()}>
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
            {
                settings.map((setting, i) => {
                    return (
                        <div key={i} className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                            <div className='col-auto pl-0'>
                                <div className='mypopover w-100 text-center'>
                                    <span>
                                        <i className='fas fa-info-circle' />
                                    </span>
                                    <div className='mypopovertext-right'>
                                        {setting.description}
                                    </div>
                                </div>
                            </div>
                            <label className='col-3 timer-label'>{setting.display}:</label>
                            {
                                getInput(setting)
                            }
                        </div>
                    )
                })
            }
            <div className={`row m-2 ${collapsed ? '' : 'hidden'}`} style={{ overflowX: 'hidden' }}>
                <span>{JSON.stringify(json)}</span>
            </div>
        </div>
    )
}