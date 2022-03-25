import { ConfirmationModal, ContainedButton } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import { ChanceCubesRewardTypeType } from '../../../types/chance-cubes/chance-cubes-reward-types';
import { ChanceCubesSettingDefType } from '../../../types/chance-cubes/chance-cubes-setting-def';
import { Mapped } from '../../../types/mapped';
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

type RewardTypesListProps = {
    readonly json: readonly Mapped[]
    readonly color: string
    readonly type: ChanceCubesRewardTypeType
    readonly settings: readonly ChanceCubesSettingDefType[]
    readonly insetRewardTypetoJson: () => void
    readonly changeRewardTypeValue: (index: number, rewardjson: Mapped) => void
    readonly deleteRewardType: () => void
    readonly deleteRewardTypeIndex: (id: number) => void
}
export const RewardTypesList = ({ json, color, type, settings, insetRewardTypetoJson, changeRewardTypeValue, deleteRewardType, deleteRewardTypeIndex }: RewardTypesListProps) => {
    const [showModal, setShowModal] = useState(false);
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
                <div className='ml-3' onClick={() => setShowModal(true)}>
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
                <ContainedButton onClick={() => insetRewardTypetoJson()}>
                    Add {type} Event
                </ContainedButton>
            </div>
            <ConfirmationModal
                show={showModal}
                text='Are you sure you want to delete everything in this reward event?'
                yesText='Yes'
                onYesClick={() => { setShowModal(false); deleteRewardType(); }}
                noText='No'
                onNoClick={() => setShowModal(false)}
            />
        </div>
    );
};
