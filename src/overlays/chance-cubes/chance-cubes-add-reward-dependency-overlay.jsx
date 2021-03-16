import { useContext } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';

export const ChanceCubesAddDependencyOverlay = (props) => {
    const overlay = useContext(OverlayContext);

    const onPick = (id) => {
        props.add(id);
        overlay.popCurrentOverlay();
    };

    return (
        <div className='container'>
            <div className='row'>
                <h2 className='col-auto mx-auto' style={{ textDecoration: 'underline' }}>
                    Add Dependency
                </h2>
            </div>
            {
                !Object.keys(props.json).includes('mod') && (
                    <div className='row'>
                        <button className='col-auto mx-auto mt-1 mb-2' onClick={() => onPick('mod')}>
                            Mod
                        </button>
                    </div>
                )
            }
            {
                !Object.keys(props.json).includes('mcVersion') && (
                    <div className='row'>
                        <button className='col-auto mx-auto mt-1 mb-2' onClick={() => onPick('mcVersion')}>
                            Minecraft Version
                        </button>
                    </div>
                )
            }
        </div>
    );
}
