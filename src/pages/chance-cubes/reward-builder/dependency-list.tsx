import { ContainedButton } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import { ChanceCubesAddDependencyModal } from '../../../modals/chance-cubes/chance-cubes-add-reward-dependency-modal';
import { ChanceCubesRewardDependency } from './chance-cubes-reward-dependency';
import { Dependency } from './dependency';

type DependencyListProps = {
    readonly deps: ChanceCubesRewardDependency
    readonly changeValue: (type: string, val: string) => void
    readonly insertDependency: (type: string, val: string) => void
    readonly deleteDependency: (type: string) => void
}
export const DependencyList = ({ deps, changeValue, insertDependency, deleteDependency }: DependencyListProps) => {

    const [showModal, setShowModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='m-2 container' style={{ border: '1px solid black' }}>
            <div className='row m-2'>
                <h4>Dependencies</h4>
                <div
                    className='ml-auto'
                    onClick={() => setCollapsed(old => !old)}
                >
                    {collapsed && (
                        <i className='clickable fas fa-chevron-left' />
                    )}
                    {!collapsed && (
                        <i className='clickable fas fa-chevron-down' />
                    )}
                </div>
            </div>
            {(!collapsed && !!deps.mod) &&
                <div className='row m-2'>
                    <Dependency
                        type='Mod'
                        value={deps.mod}
                        color={'#c1fda1'}
                        changeValue={value => changeValue('mod', value)}
                        deleteDependency={() => deleteDependency('mod')}
                    />
                </div>
            }
            {(!collapsed && !!deps.mcVersion) &&
                <div className='row m-2'>
                    <Dependency
                        type='Minecraft Version'
                        value={deps.mcVersion}
                        color={'#af2ea2'}
                        changeValue={value => changeValue('mcVersion', value)}
                        deleteDependency={() => deleteDependency('mcVersion')}
                    />
                </div>
            }
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <ContainedButton onClick={() => setShowModal(true)}>
                    Add Dependency
                </ContainedButton>
            </div>
            {showModal && <ChanceCubesAddDependencyModal
                show={showModal}
                requestClose={() => setShowModal(false)}
                deps={deps}
                add={type => insertDependency(type, '')}
            />}
        </div>
    );
};
