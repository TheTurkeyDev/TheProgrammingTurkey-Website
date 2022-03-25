import { ConfirmationModal, Input } from '@theturkeydev/gobble-lib-react';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { ChanceCubesNumberSettingDef, ChanceCubesSettingDefType } from '../../../types/chance-cubes/chance-cubes-setting-def';
import { Mapped } from '../../../types/mapped';

const RewardTypeWrapper = styled.div`
    border: 1px solid ${({ color }) => color};
    width: 100%;
    padding: 0 8px;
    display: grid;
    overflow-wrap: anywhere;
`;

const SettingsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
`;

type RewardTypeProps = {
    readonly json: Mapped
    readonly settings: readonly ChanceCubesSettingDefType[]
    readonly color: string
    readonly setRewardTypeState: (json: Mapped) => void
    readonly deleteRewardType: () => void
}

export const RewardType = ({ json, settings, color, setRewardTypeState, deleteRewardType }: RewardTypeProps) => {
    const [showModal, setShowModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeValue = (setting: ChanceCubesSettingDefType, value: any) => {

        //ChanceCubesNumberSettingDef | ChanceCubesNumberSettingDef
        const numSetting = setting as ChanceCubesNumberSettingDef;
        if (numSetting.min !== undefined || numSetting.min === 0)
            value = Math.max(value, numSetting.min);
        if (numSetting.max !== undefined || numSetting.max === 0)
            value = Math.min(value, numSetting.max);

        const jsonCopy = { ...json };
        jsonCopy[setting.key] = value;
        setRewardTypeState(jsonCopy);
    };

    const getInput = (setting: ChanceCubesSettingDefType) => {
        switch (setting.type) {
            case 'number':
                return (
                    <Input type='number' name='num' label={setting.display} value={json[setting.key]} onChange={e => changeValue(setting, parseInt(e.target.value))} />
                );
            case 'decimal':
                return (
                    <Input type='number' name='num' label={setting.display} step='0.01' value={json[setting.key]} onChange={e => changeValue(setting, parseFloat(e.target.value))} />
                );
            case 'text':
                return (
                    <Input name='text' label={setting.display} value={json[setting.key]} onChange={e => changeValue(setting, e.target.value)} />
                );
            case 'boolean':
                return (
                    <div className='toggle-switch'>
                        <input type='checkbox' checked={json[setting.key]} onChange={() => { }} />
                        <span className='toggle-slider round' onClick={() => changeValue(setting, !json[setting.key])}></span>
                    </div>
                );
        }
    };

    return (
        <RewardTypeWrapper color={color}>
            <div className='row mt-2'>
                <div className='col-auto ml-auto' onClick={() => setCollapsed(old => !old)}>
                    {
                        collapsed ? <i className='fas fa-chevron-left' /> : <i className='fas fa-chevron-down' />
                    }
                </div>
                <div className='col-auto' onClick={() => setShowModal(true)}>
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
            {
                collapsed ? (
                    <span>{JSON.stringify(json)}</span>
                ) : (
                    <SettingsWrapper>
                        {
                            settings.map(setting => (
                                <Fragment key={setting.key}>
                                    <div className='mypopover w-100 text-center'>
                                        <span>
                                            <i className='fas fa-info-circle' />
                                        </span>
                                        <div className='mypopovertext-right'>
                                            {setting.description}
                                        </div>
                                    </div>
                                    {getInput(setting)}
                                </Fragment>
                            ))
                        }
                    </SettingsWrapper>
                )
            }
            <ConfirmationModal
                show={showModal}
                text='Are you sure you want to delete this event?'
                yesText='Yes'
                onYesClick={() => { setShowModal(false); deleteRewardType(); }}
                noText='No'
                onNoClick={() => setShowModal(false)}
            />
        </RewardTypeWrapper>
    );
};