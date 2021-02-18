import React, { useEffect, useState } from 'react';

import { PageWrapper } from '../base/page-wrapper';

const statusInfo = [
    { bg: '#8f8f8f', text: 'Untested' },
    { bg: '#046e22', text: 'Working' },
    { bg: '#edda09', text: 'Not Working' },
    { bg: '#bf0000', text: 'Bugged' },
    { bg: '#1f1f1f', text: 'Not Available' },
];

const gameVersions = [
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

export function ChanceCubesRewardsStatus(props) {
    const [rewards, setRewards] = useState({});
    const [notes, setNotes] = useState([]);

    const params = {};
    if (props.location.search !== '') {
        props.location.search
            .substr(1)
            .split('&')
            .forEach((part) => {
                let keyVal = part.split('=');
                params[keyVal[0]] = keyVal[1];
            });
    }

    useEffect(() => {
        fetch(
            'https://api.theprogrammingturkey.com/chance_cubes/RewardStatusAPI.php'
        )
            .then((resp) => resp.json())
            .then((json) => {
                let rewards = {};
                json.rewards.forEach((element) => {
                    if (!Object.prototype.hasOwnProperty.call(rewards, element.reward_name))
                        rewards[element.reward_name] = {};
                    rewards[element.reward_name][element.game_version] =
                        element.status;
                });

                setNotes(json.notes);
                setRewards(rewards);

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

    const copyToClipBoard = (reward) => {
        navigator.clipboard.writeText(
            `https://theturkey.dev/chancecubes/rewardstatus?reward=${reward}`
        );
    };

    return (
        <PageWrapper>
            <div className='m-2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col text-right' style={{ width: '150px', maxWidth: '150px' }}>
                            Game Version
                        </div>
                        <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                            Reward Status
                        </div>
                        <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                            %
                        </div>
                        <div className='col m-0 p-0' style={{ width: '150px', maxWidth: '150px' }}>
                            Rewards Working
                        </div>
                        <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                            %
                        </div>
                        <div className='col'>

                        </div>
                    </div>
                    {
                        Object.entries(computeVersionCompletion(rewards)).map(entry => {
                            return (
                                <div key={entry[0]} className='row'>
                                    <div className='col text-right' style={{ width: '150px', maxWidth: '150px' }}>
                                        {entry[0]}:
                                    </div>
                                    <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                                        {entry[1].completed}/{entry[1].total}
                                    </div>
                                    <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                                        {(entry[1].completed / entry[1].total * 100).toFixed(2)}%
                                    </div>
                                    <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                                        {entry[1].working} / {entry[1].completed}
                                    </div>
                                    <div className='col' style={{ width: '150px', maxWidth: '150px' }}>
                                        {(entry[1].working / (entry[1].completed == 0 ? 1 : entry[1].completed) * 100).toFixed(2)}%
                                    </div>
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
                    statusInfo.map((json, i) => {
                        return (
                            <div key={i} className='col-auto m-2' style={{ background: json.bg, width: '125px' }}>
                                {json.text}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div className='m-2'>
                    <table className='table sticky-table'>
                        <thead>
                            <tr className='text-center text-light'>
                                <th scope='col'></th>
                                <th scope='col'>Reward/ Version</th>
                                {
                                    gameVersions.map(v => <th key={v} scope='col'>{v}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(rewards).filter(entry => !entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b)).map((reward) => {
                                    return (
                                        <tr key={reward} id={reward} className={params.reward === reward ? 'highlight-fade' : ''}>
                                            <td scope='row' className='p-1 text-center text-light'> <i className='fas fa-link' onClick={() => copyToClipBoard(reward)}></i></td>
                                            <td className='p-1 text-light'> {reward} </td>
                                            {
                                                gameVersions.map((version, index) => {
                                                    const status = Object.prototype.hasOwnProperty.call(rewards[reward], version) ? rewards[reward][version] : 0;
                                                    const rewardNotes = notes.filter(note => note.game_version === version && note.reward_name === reward);
                                                    return (
                                                        <td key={`${version}-${index}`} className='p-1' style={{ backgroundColor: statusInfo[status]['bg'], borderRight: '1px solid #ababab', height: '40px' }}>
                                                            {
                                                                rewardNotes.length > 0 &&
                                                                <div className='mypopover w-100 text-center'>
                                                                    <span><i className='fas fa-info-circle'></i></span>
                                                                    <div className='mypopovertext'>
                                                                        {
                                                                            rewardNotes.map(note => {
                                                                                let date = new Date(note.date);
                                                                                return (
                                                                                    <div key={date.toUTCString()}>
                                                                                        <div className='w-100 text-left pl-2' style={{ color: '#b9b9b9' }}>
                                                                                            {date.toUTCString()}
                                                                                        </div>
                                                                                        <div className='w-100 text-center pl-4 pr-4'>
                                                                                            {note.note}
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='mt-4'>
                    <h3 className='m-0'>Custom User Rewards</h3>
                </div>
                <div className='m-2'>
                    <table className='table sticky-table'>
                        <thead>
                            <tr className='text-center text-light'>
                                <th scope='col'>Reward/ Version</th>
                                <th scope='col'>1.7.10</th>
                                <th scope='col'>1.8</th>
                                <th scope='col'>1.9</th>
                                <th scope='col'>1.10</th>
                                <th scope='col'>1.11</th>
                                <th scope='col'>1.12</th>
                                <th scope='col'>1.13</th>
                                <th scope='col'>1.14</th>
                                <th scope='col'>1.15</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(rewards).filter(entry => entry.startsWith('chancecubes:cr_')).sort((a, b) => a.localeCompare(b)).map((reward) => {
                                    return (
                                        <tr key={reward}>
                                            <td scope='row' className='p-1 text-light'> {reward} </td>
                                            {
                                                gameVersions.map((version, index) => {
                                                    let status = 0;
                                                    if (Object.prototype.hasOwnProperty.call(rewards[reward], version))
                                                        status = rewards[reward][version];
                                                    return (
                                                        <td key={`${version}-${index}`} className='p-1 text-center' style={{ backgroundColor: statusInfo[status]['bg'], borderRight: '1px solid #ababab' }}>
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </PageWrapper >
    );
}

function computeVersionCompletion(rewards) {
    let versions = {};
    Object.keys(rewards).forEach((reward) => {
        if (!reward.startsWith('chancecubes:cr')) {
            gameVersions.forEach((version) => {
                if (!Object.prototype.hasOwnProperty.call(versions, version))
                    versions[version] = { completed: 0, total: 0, working: 0 };

                let status = rewards[reward][version];
                if (status != 4) {
                    versions[version].total += 1;

                    if (status && status != 0) {
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
