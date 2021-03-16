import { useContext, useState } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ChanceCubesAddDependencyOverlay } from '../../../overlays/chance-cubes/chance-cubes-add-reward-dependency-overlay';
import { Dependency } from './dependency';

export function DependencyList(props) {
    const overlay = useContext(OverlayContext);

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='m-2 container' style={{ border: '1px solid black' }}>
            <div className='row m-2'>
                <h4>Dependencies</h4>
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
            </div>
            <div className={`row m-2 ${(collapsed || !Object.keys(props.json).includes('mod')) ? 'hidden' : ''}`}>
                <Dependency
                    type='Mod'
                    value={props.json.mod}
                    color={'#c1fda1'}
                    changeValue={(value) => props.changeValue('mod', value)}
                    delete={() => {
                        props.delete('mod');
                    }}
                />
            </div>
            <div className={`row m-2 ${collapsed || !Object.keys(props.json).includes('mcVersion') ? 'hidden' : ''}`}>
                <Dependency
                    type='Minecraft Version'
                    value={props.json.mcVersion}
                    color={'#af2ea2'}
                    changeValue={(value) =>
                        props.changeValue('mcVersion', value)
                    }
                    delete={() => {
                        props.delete('mcVersion');
                    }}
                />
            </div>
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <button
                    className='ml-2 mt-2'
                    onClick={() => {
                        overlay.pushCurrentOverlay(
                            <ChanceCubesAddDependencyOverlay
                                json={props.json}
                                add={(type) => props.insertDependency(type, '')}
                            />
                        );
                    }}
                >
                    Add Dependency
                </button>
            </div>
        </div>
    );
}
