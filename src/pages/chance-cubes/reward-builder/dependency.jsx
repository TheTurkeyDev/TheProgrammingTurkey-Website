import { useContext } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ConfirmationOverlay } from '../../../overlays/confirmation-overlay';

export const Dependency = ({ type, value, color, changeValue, deleteDependency }) => {
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
                            deleteDependency();
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
            style={{ border: `1px solid ${color}` }}
        >
            <div className='row ml-2 mt-2'>
                <label className='col-3 timer-label'>{type}:</label>
                <input
                    className='col'
                    style={{ maxWidth: '250px' }}
                    type='text'
                    value={value}
                    onChange={e => changeValue(e.target.value)}
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
