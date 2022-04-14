import { BaseTheme, ContainedButton, Input, Modal, Option, Select, TextArea, ToggleSwitch } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { getRewardSettings, saveReward } from '../../network/chance-cubes-network';
import { gameVersions, statusInfo } from '../../pages/chance-cubes/reward-status/chance-cubes-rewards-status';
import { ChanceCubesRewardSetting } from '../../types/chance-cubes/chance-cubes-reward-setting';
import { CCVersionedRewardData } from '../../types/chance-cubes/chance-cubes-versioned-reward';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns:1fr;
    gap: 8px;
    justify-items: center;
`;

const InputsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    align-items: center;

    &>label{
       text-align: end;
    }
`;

const RewardSettingsWrapper = styled.table`
    color: ${({ theme }: ThemeProps<BaseTheme>) => theme.background.on};
`;

type ChanceCubesRewardEditModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly name: string
    readonly data: CCVersionedRewardData
}
export const ChanceCubesRewardEditModal = ({ show, requestClose, name, data }: ChanceCubesRewardEditModalProps) => {
    const [settings, setSettings] = useState<readonly ChanceCubesRewardSetting[]>([]);

    const [mcVersion, setMcVersion] = useState('1.7.10');
    const [versionStatus, setVersionStatus] = useState(data.versions['1.7.10']);

    const [isGCCReward, setIsGCCReward] = useState(data.isgcr);
    const [chanceValue, setChanceValue] = useState(data.chance);
    const [description, setDescription] = useState('');
    const [allVersionsStatus, setAllVersionsStatus] = useState(data.versions);

    useEffect(() => {
        if (!show)
            return;
        getRewardSettings(name).then(json => {
            if (json.success)
                setSettings(json.data);
        });
    }, [show]);

    useEffect(() => {
        setVersionStatus(allVersionsStatus[mcVersion] ?? 0);
    }, [mcVersion]);

    const updateVersionStatus = (ver: number) => {
        setVersionStatus(ver);
        setAllVersionsStatus(vs => {
            vs[mcVersion] = ver;
            return vs;
        });
    };

    const save = () => {
        saveReward(name, chanceValue, isGCCReward, gameVersions.map(v => ({
            game_version: v,
            status: allVersionsStatus[v] ?? 0
        }))).then(json => {
            if (json.success) {
                requestClose();
            }
            else {
                console.log(json.message);
            }
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <h2>{name}</h2>
                <hr />
                <ToggleSwitch label='Giant Cube Reward' checked={isGCCReward} onClick={() => setIsGCCReward(!isGCCReward)} />
                <Input type='number' name='chanceValue' label='Chance Value' value={chanceValue} min={-100} max={100} onChange={e => setChanceValue(parseInt(e.target.value))} />
                <TextArea name='description' label='Description' value={description} onChange={e => setDescription(e.target.value)} />
                <InputsWrapper>
                    <Select value={mcVersion} onChange={e => setMcVersion(e.target.value)}>
                        {gameVersions.map(v => <Option key={v} value={v}>{v}</Option>)}
                    </Select>
                    <Select value={versionStatus} onChange={e => updateVersionStatus(parseInt(e.target.value))}>
                        {statusInfo.map((s, i) => <Option key={s.text} value={i}>{s.text}</Option>)}
                    </Select>
                </InputsWrapper>
                <hr />
                <h2>Reward Settings</h2>
                <RewardSettingsWrapper className='table'>
                    <thead>
                        <tr>
                            <th>Setting</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                            <th>Min</th>
                            <th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            settings.map(setting => (
                                <tr key={setting.setting}>
                                    <td>{setting.setting}</td>
                                    <td>{setting.type}</td>
                                    <td>{setting.default}</td>
                                    <td>{setting.description}</td>
                                    <td>{setting.min ?? 'N/A'}</td>
                                    <td>{setting.max ?? 'N/A'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </RewardSettingsWrapper>
                <ContainedButton onClick={() => save()}>
                    Save
                </ContainedButton>
            </ContentWrapper>
        </Modal>
    );
};