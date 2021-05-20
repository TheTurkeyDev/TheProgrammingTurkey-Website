import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRewardSettings } from '../../network/chance-cubes-network';


const ChanceValueWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 8px;
    width: fit-content;
    margin: 0 auto;
`;

const RewardSettingsWrapper = styled.table`
    color: ${props => props.theme.color.textPrimary};
`

export const ChanceCubesRewardInfoOverlay = ({ name, data }) => {
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        getRewardSettings(name).then(json => {
            if (json.success)
                setSettings(json.data);
        })
    }, []);
    return (
        <>
            <h2>
                {name}
            </h2>
            <hr />
            {
                data.isgcr ?
                    <div>
                        <span>Giant Chance Cube Reward</span>
                    </div>
                    :
                    <ChanceValueWrapper>
                        <span>Chance Value:</span>
                        <span>{data.chance}</span>
                    </ChanceValueWrapper>
            }
            <div>
                Description: Comming soon...
            </div>
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
        </>
    );
}