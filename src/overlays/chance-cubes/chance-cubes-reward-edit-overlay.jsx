import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { OverlayContext } from '../../contexts/overlay-context';
import { getRewardSettings, saveReward } from '../../network/chance-cubes-network';
import { gameVersions, statusInfo } from '../../pages/chance-cubes/reward-status/chance-cubes-rewards-status';

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
    color: ${props => props.theme.color.textPrimary};
`

export const ChanceCubesRewardEditOverlay = ({ name, data }) => {
    const overlay = useContext(OverlayContext);

    const [settings, setSettings] = useState([]);

    const [mcVersion, setMcVersion] = useState('1.7.10');
    const [versionStatus, setVersionStatus] = useState(data.versions['1.7.10']);

    const [isGCCReward, setIsGCCReward] = useState(data.isgcr);
    const [chanceValue, setChanceValue] = useState(data.chance);
    const [description, setDescription] = useState(data.description);
    const [allVersionsStatus, setAllVersionsStatus] = useState(data.versions);

    useEffect(() => {
        getRewardSettings(name).then(json => {
            if (json.success)
                setSettings(json.data);
        })
    }, []);

    useEffect(() => {
        setVersionStatus(allVersionsStatus[mcVersion] ?? 0);
    }, [mcVersion]);

    const updateVersionStatus = (ver) => {
        setVersionStatus(ver);
        setAllVersionsStatus(vs => {
            vs[mcVersion] = ver
            return vs;
        })
    }

    const save = () => {
        saveReward(name, chanceValue, isGCCReward, gameVersions.map(v => ({
            game_version: v,
            status: allVersionsStatus[v] ?? 0
        }))).then(json => {
            if (json.success) {
                overlay.popCurrentOverlay();
            }
            else {
                console.log(json.message);
            }
        })
    }

    return (
        <>
            <h2>
                {name}
            </h2>
            <hr />
            <InputsWrapper>
                <label>Giant Cube Reward</label>
                <input type='checkbox' checked={isGCCReward} onChange={e => setIsGCCReward(e.target.checked)} />
                <label>Chance Value</label>
                <input type='number' value={chanceValue} min={-100} max={100} onChange={e => setChanceValue(e.target.value)} />
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <select value={mcVersion} onChange={e => setMcVersion(e.target.value)}>
                    {gameVersions.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <select value={versionStatus} onChange={e => updateVersionStatus(parseInt(e.target.value))}>
                    {statusInfo.map((s, i) => <option key={s.text} value={i}>{s.text}</option>)}
                </select>
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
            <button onClick={() => save()}>
                Save
            </button>
        </>
    );
}