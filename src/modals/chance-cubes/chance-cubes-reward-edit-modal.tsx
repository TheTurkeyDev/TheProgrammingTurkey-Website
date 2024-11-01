import { ContainedButton, Input, Modal, Option, Select, TextArea, ToggleSwitch, useFetch, useQuery } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gameVersions, statusInfo } from '../../pages/chance-cubes/reward-status/chance-cubes-rewards-status';
import { ChanceCubesRewardSetting } from '../../types/chance-cubes/chance-cubes-reward-setting';
import { CCVersionedRewardData } from '../../types/chance-cubes/chance-cubes-versioned-reward';
import { getDevAPIBase } from '../../network/network-helper';
import { getParams, patchParams } from '../../network/auth-network';

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
    color: ${({ theme }) => theme.background.on};
`;

type ChanceCubesRewardEditModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly name: string
    readonly data: CCVersionedRewardData
}
export const ChanceCubesRewardEditModal = ({ show, requestClose, name, data }: ChanceCubesRewardEditModalProps) => {

    const [saveReward] = useQuery(`${getDevAPIBase()}/chancecubes/rewards`, { requestData: patchParams });

    const [settings, loading] = useFetch<readonly ChanceCubesRewardSetting[]>(`${getDevAPIBase()}/chancecubes/rewards/${name}/settings`, { requestData: getParams });

    const [mcVersion, setMcVersion] = useState('1.7.10');
    const [versionStatus, setVersionStatus] = useState(data.versions['1.7.10']);

    const [isGCCReward, setIsGCCReward] = useState(data.isgcr);
    const [chanceValue, setChanceValue] = useState(data.chance);
    const [description, setDescription] = useState('');
    const [allVersionsStatus, setAllVersionsStatus] = useState(data.versions);

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
        saveReward(JSON.stringify({
            name,
            chance: chanceValue,
            giantCubeReward: isGCCReward
        }), name)
            .then(() => saveReward(JSON.stringify(gameVersions.map(v => ({
                gameVersion: v,
                rewardName: name,
                status: allVersionsStatus[v] ?? 0
            }))), `${name}/status`))
            .then(() => requestClose())
            .catch(e => console.log(e.message));

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
                            settings?.map(setting => (
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