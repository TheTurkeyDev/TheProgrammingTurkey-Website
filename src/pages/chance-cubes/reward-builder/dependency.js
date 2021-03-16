import { useContext } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ConfirmationOverlay } from '../../../overlays/confirmation-overlay';

export function Dependency(props) {
    const overlay = useContext(OverlayContext);

    const deleteInstance = () => {
        overlay.pushCurrentOverlay(
            <ConfirmationOverlay
                text={'Are you sure you want to delete this dependency?'}
                options={[
                    {
                        text: 'Yes',
                        callback: () => {
                            overlay.popCurrentOverlay();
                            props.delete();
                        },
                    },
                    { text: 'No', callback: () => overlay.popCurrentOverlay() },
                ]}
            />
        );
    };

    return (
        <div
            className='m-2 container pb-3'
            style={{ border: `1px solid ${props.color}` }}
        >
            <div className='row ml-2 mt-2'>
                <label className='col-3 timer-label'>{props.type}:</label>
                <input
                    className='col'
                    style={{ maxWidth: '250px' }}
                    type='text'
                    value={props.value}
                    onChange={(e) => {
                        props.changeValue(e.target.value);
                    }}
                />
                <div
                    className='ml-auto col-auto'
                    onClick={() => deleteInstance()}
                >
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
        </div>
    );
}
