import { ConfirmationModal, Input, ToggleSwitch } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { CollapseChevron } from '../../../components/collapse-chevron';
import { Icon } from '../../../components/icon';
import { IconWithPopOver } from '../../../components/pop-over';
import { ChanceCubesNumberSettingDef, ChanceCubesSettingDefType } from '../../../types/chance-cubes/chance-cubes-setting-def';
import { Mapped } from '../../../types/mapped';
import { NBTInput } from './nbt-input';

const RewardTypeWrapper = styled.div`
    border: 1px solid ${({ color }) => color};
    width: 100%;
    padding: 8px;
    display: grid;
    overflow-wrap: anywhere;
    gap: 8px;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 16px;
`;

const SettingsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
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

        setRewardTypeState({
            ...json,
            [setting.key]: value
        });
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
                    <ToggleSwitch label={setting.display} checked={json[setting.key]} onClick={() => changeValue(setting, !json[setting.key])} />
                );
            case 'nbt':
                return (
                    <NBTInput label={setting.display} />
                );
        }
    };

    return (
        <RewardTypeWrapper color={color}>
            <Header>
                <div />
                <CollapseChevron collapsed={collapsed} setCollapsed={setCollapsed} />
                <Icon name='fas fa-trash' onClick={() => setShowModal(true)} />
            </Header>
            {
                collapsed ? (
                    <span>{JSON.stringify(json)}</span>
                ) : (
                    <SettingsWrapper>
                        {
                            settings.map(setting => (
                                <Fragment key={setting.key}>
                                    <IconWithPopOver icon='fas fa-info-circle' direction='right'>
                                        {setting.description}
                                    </IconWithPopOver>
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