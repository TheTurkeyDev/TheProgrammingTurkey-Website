import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../contexts/auth-context';
import { OverlayContext } from '../../../contexts/overlay-context';
import { getChanceCubesRewardStatus } from '../../../network/chance-cubes-network';
import { ChanceCubesRewardCreateOverlay } from '../../../overlays/chance-cubes/chance-cubes-reward-create-overlay';
import { LoadingWrapper } from '../../base/page-loading';
import { ChanceCubesRewardStatusTable } from './chance-cubes-reward-status-table';

export const statusInfo = [
    { bg: '#8f8f8f', text: 'Untested' },
    { bg: '#046e22', text: 'Working' },
    { bg: '#edda09', text: 'Not Working' },
    { bg: '#bf0000', text: 'Bugged' },
    { bg: '#1f1f1f', text: 'Not Available' },
];

export const gameVersions = [
    '1.7.10',
    '1.8',
    '1.9',
    '1.10',
    '1.11',
    '1.12',
    '1.13',
    '1.14',
    '1.15',
    '1.16',
];

const ColDiv = styled.div`
    width: 150px;
    max-width: 150px;
`;

const GCCRewardText = styled.div`
 color: ${props => props.theme.color.primaryLight};
`

export const ChanceCubesRewardsStatus = ({ location }) => {

    const auth = useContext(AuthContext);
    const overlay = useContext(OverlayContext);

    const [rewards, setRewards] = useState({});
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const canEdit = auth.permissions.includes('chancecubes.managerewards')

    const params = {};
    if (location.search !== '') {
        location.search
            .substr(1)
            .split('&')
            .forEach((part) => {
                let keyVal = part.split('=');
                params[keyVal[0]] = keyVal[1];
            });
    }

    useEffect(() => {
        getChanceCubesRewardStatus()
            .then(json => {
                let rewards = {};
                json.rewards.forEach(element => {
                    if (!Object.prototype.hasOwnProperty.call(rewards, element.name))
                        rewards[element.name] = { versions: [] };
                    rewards[element.name].versions[element.version] = element.status;
                    rewards[element.name].chance = element.chance;
                    rewards[element.name].isgcr = element.is_giant_cube_reward;
                });

                setNotes(json.notes);
                setRewards(rewards);
                setLoading(false);

                if (params.reward)
                    setTimeout(
                        () =>
                            document
                                .getElementById(params.reward)
                                .scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                }),
                        1000
                    );
            });
    }, []);

    return (
        <LoadingWrapper loading={loading}>
            <div className='m-2'>
                <div className='container'>
                    <div className='row'>
                        <ColDiv className='col text-right'>
                            Game Version
                        </ColDiv>
                        <ColDiv className='col'>
                            Reward Status
                        </ColDiv>
                        <ColDiv className='col'>
                            %
                        </ColDiv>
                        <ColDiv className='col m-0 p-0'>
                            Rewards Working
                        </ColDiv>
                        <ColDiv className='col'>
                            %
                        </ColDiv>
                        <div className='col'>

                        </div>
                    </div>
                    {
                        Object.entries(computeVersionCompletion(rewards)).map(entry => {
                            return (
                                <div key={entry[0]} className='row'>
                                    <ColDiv className='col text-right'>
                                        {entry[0]}:
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {entry[1].completed}/{entry[1].total}
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {(entry[1].completed / entry[1].total * 100).toFixed(2)}%
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {entry[1].working} / {entry[1].completed}
                                    </ColDiv>
                                    <ColDiv className='col'>
                                        {(entry[1].working / (entry[1].completed == 0 ? 1 : entry[1].completed) * 100).toFixed(2)}%
                                    </ColDiv>
                                    <div className='col'>

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='text-center m-0 ml-2 fluid-container row'>
                {
                    statusInfo.map(json => (
                        <div key={json.text} className='col-auto m-2' style={{ background: json.bg, width: '125px' }}>
                            {json.text}
                        </div>
                    ))
                }
                {
                    canEdit && <button className='m-2' onClick={() => overlay.pushCurrentOverlay(<ChanceCubesRewardCreateOverlay />)}>Add Reward</button>
                }
            </div>
            <GCCRewardText>
                *GCC = Giant Chance Cube Reward
            </GCCRewardText>
            <ChanceCubesRewardStatusTable
                allRewards={rewards}
                shownRewards={Object.keys(rewards).filter(entry => !entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b))}
                notes={notes}
                highlightedReward={params.reward}
                canEdit={canEdit}
            />
            <div className='mt-4'>
                <h3 className='m-0'>Custom User Rewards</h3>
            </div>
            <ChanceCubesRewardStatusTable
                allRewards={rewards}
                shownRewards={Object.keys(rewards).filter(entry => entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b))}
                notes={notes}
                highlightedReward={params.reward}
                canEdit={canEdit}
            />
        </LoadingWrapper>
    );
}

function computeVersionCompletion(rewards) {
    const versions = {};
    Object.keys(rewards).forEach(reward => {
        if (!reward.startsWith('chancecubes:cr')) {
            gameVersions.forEach(version => {
                if (!Object.prototype.hasOwnProperty.call(versions, version))
                    versions[version] = { completed: 0, total: 0, working: 0 };

                const status = rewards[reward].versions[version] ?? 0;
                if (status != 4) {
                    versions[version].total += 1;

                    if (status != 0) {
                        versions[version].completed += 1;
                        if (status == 1) {
                            versions[version].working += 1;
                        }
                    }
                }
            });
        }
    });
    return versions;
}
